/**
 * Upgrade versions across root and all nested workspaces.
 *
 * What it does per project (root + each workspace):
 *  - Update @openfin/core-web version in package.json (if present)
 *  - Update @openfin/cloud-interop version in package.json (if present)
 *  - Update @openfin/core version in package.json (if present)
 *  - Update top-level "version" in package.json
 *  - Replace versioned URLs in files (.html, .json, .ts, .tsx, .js, .jsx, .md)
 *  - Run: npm install, npm audit fix, npm run build (if script exists)
 *
 * URL versioning uses regex pattern matching - URLs like:
 *   built-on-openfin.github.io/.../vX.X.X/
 * are automatically updated to the target version (no --from needed).
 *
 * Defaults (can be overridden with CLI flags). Edit DEFAULT_VERSIONS below before running.
 *
 * CLI examples:
 *   node scripts/upgrade-versions.mjs --dry-run
 *   node scripts/upgrade-versions.mjs --core 43.101.1 --core-web 0.43.0 --pkg-version 23.1.0
 *   node scripts/upgrade-versions.mjs --to v24.0.0
 *   node scripts/upgrade-versions.mjs --skip-audit --skip-build
 */

import { spawn } from 'child_process';
import FastGlob from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

// ---------- Defaults (edit these before running if needed) ----------
const DEFAULT_VERSIONS = {
  major: '23.0.0',
  'github-url': '23.0.0',
  core: '43.101.2',
  'core-web': '0.43.113',
  'cloud-interop': '0.43.113'
};


// Directories to exclude from search/replace
const EXCLUDED_DIRECTORIES = [
  'node_modules',
  'dist',
  'build',
  'out',
  'coverage',
  '.next',
  '.cache',
  '.git',
  '.angular',
  '.venv',
  'tmp',
  'logs'
];

// File extensions to search for versioned URLs
const VERSIONED_URL_EXTENSIONS = ['.html', '.json', '.ts', '.tsx', '.js', '.jsx', '.md'];

async function run() {
  const args = parseArgs(process.argv.slice(2));

  console.log('Upgrade Versions');
  console.log('================');
  console.log();
  console.log(`Platform: ${process.platform}`);
  console.log('Options:', JSON.stringify({
    core: args.core,
    cloudInterop: args.cloudInterop,
    coreWeb: args.coreWeb,
    pkgVersion: args.pkgVersion,
    targetVersion: args.wsTo,
    caseInsensitive: args.caseInsensitive,
    includeRoot: args.includeRoot,
    dryRun: args.dryRun,
    skipInstall: args.skipInstall,
    skipAudit: args.skipAudit,
    skipBuild: args.skipBuild,
    skipPrettier: args.skipPrettier,
    failFast: args.failFast
  }, null, 2));

  const rootDir = process.cwd();
  const rootPackage = await loadJson(path.join(rootDir, 'package.json'));

  // Discover workspaces via root workspaces field
  const workspaces = await FastGlob(rootPackage.workspaces || [], { onlyDirectories: true });

  // Respect optional packageExclude array if present
  const excluded = new Set(rootPackage.packageExclude || []);
  const workspaceDirs = workspaces
    .filter((ws) => !excluded.has(ws))
    .filter((ws) => !!ws);

  // Include root project if requested
  const projectDirs = args.includeRoot ? ['.'].concat(workspaceDirs) : workspaceDirs;

  const summary = [];
  for (const projectDir of projectDirs) {
    const abs = path.resolve(projectDir);
    const pkgFile = path.join(abs, 'package.json');

    if (!(await fileExists(pkgFile))) {
      console.warn(`[SKIP] No package.json in ${projectDir}`);
      continue;
    }

    console.log();
    console.log('---');
    console.log(`Project: ${projectDir}`);
    console.log('---');

    const projectResult = {
      project: projectDir,
      versionUpdates: [],
      filesChanged: 0,
      installOk: true,
      auditOk: true,
      buildOk: true,
      error: null
    };

    try {
      // 1) Update versions in package.json
      const pkgJson = await loadJson(pkgFile);
      const pkgFileOriginalText = await fs.readFile(pkgFile, 'utf8');
      const before = JSON.stringify(pkgJson);

      const changes = updatePackageVersions(pkgJson, {
        core: args.core,
        cloudInterop: args.cloudInterop,
        coreWeb: args.coreWeb,
        pkgVersion: args.pkgVersion
      });

      if (changes.length) {
        projectResult.versionUpdates.push(...changes);
      }

      const after = JSON.stringify(pkgJson);
      if (!args.dryRun && before !== after) {
        await writeJson(pkgFile, pkgJson, { originalText: pkgFileOriginalText });
      } else if (before !== after) {
        console.log(`[DRY-RUN] Would update ${pkgFile}`);
      }

      // 2) Replace versioned URLs in files
      const changedCount = await replaceVersionedUrls(abs, args);
      projectResult.filesChanged += changedCount;

      // 3) npm install, audit fix, build
      if (!args.skipInstall) {
        await runShellCmd('npm', ['install'], abs, args);
      }
      if (!args.skipAudit) {
        try {
          await runShellCmd('npm', ['audit', 'fix'], abs, args);
        } catch (e) {
          // Treat npm audit fix non-fatally: warn and continue
          console.warn('[WARN] npm audit fix reported issues; continuing.');
          projectResult.auditOk = false;
        }
      }

      if (!args.skipBuild) {
        // Only run build if script exists
        const hasBuild = !!(pkgJson?.scripts?.build);
        if (hasBuild) {
          await runShellCmd('npm', ['run', 'build'], abs, args);
        } else {
          console.log('[INFO] No build script; skipping build');
        }
      }

      // 4) Optional: run prettier if script exists in this project
      if (!args.skipPrettier) {
        const hasPrettier = !!(pkgJson?.scripts?.prettier);
        if (hasPrettier) {
          await runShellCmd('npm', ['run', 'prettier'], abs, args);
        }
      }

      console.log(`[OK] Completed: ${projectDir}`);
    } catch (err) {
      console.error(`[FAIL] ${projectDir}:`, err?.message || err);
      projectResult.error = err?.message || String(err);
      if (String(err).includes('npm install')) projectResult.installOk = false;
      if (String(err).includes('npm audit')) projectResult.auditOk = false;
      if (String(err).includes('npm run build')) projectResult.buildOk = false;
      if (args.failFast) {
        throw err;
      }
    } finally {
      summary.push(projectResult);
    }
  }

  // Print summary
  console.log();
  console.log('Summary');
  console.log('=======');
  let failures = 0;
  for (const s of summary) {
    const status = s.error ? 'FAIL' : 'OK';
    if (s.error) failures += 1;
    console.log(`- ${s.project}: ${status}`);
    if (s.versionUpdates?.length) {
      for (const u of s.versionUpdates) console.log(`    ${u}`);
    }
    if (s.filesChanged) console.log(`    Files changed (find/replace): ${s.filesChanged}`);
    if (s.auditOk === false) console.log('    Audit: issues detected (non-fatal)');
    if (s.error) console.log(`    Error: ${s.error}`);
  }

  if (!summary.length) {
    console.warn('No projects processed. Check your workspaces configuration or flags.');
  }

  if (failures > 0) {
    process.exitCode = 1;
  }
}

function parseArgs(argv) {
  // Very small custom parser to avoid extra deps in ESM path
  const map = new Map();
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = argv[i + 1];
    const set = (k, v = true) => map.set(k, v);
    switch (a) {
      case '--core': set('core', next); i += 1; break;
      case '--cloud-interop': set('cloudInterop', next); i += 1; break;
      case '--core-web': set('coreWeb', next); i += 1; break;
      case '--pkg-version': set('pkgVersion', next); i += 1; break;
      case '--to': set('wsTo', next); i += 1; break;
      case '--case-insensitive':
      case '--ci': set('caseInsensitive', true); break;
      case '--include-root': set('includeRoot', true); break;
      case '--dry-run': set('dryRun', true); break;
      case '--skip-install': set('skipInstall', true); break;
      case '--skip-audit': set('skipAudit', true); break;
      case '--skip-build': set('skipBuild', true); break;
      case '--skip-prettier': set('skipPrettier', true); break;
      case '--fail-fast': set('failFast', true); break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        // ignore unknown for simplicity
        break;
    }
  }

  const core = map.get('core') || DEFAULT_VERSIONS.core;
  const coreWeb = map.get('coreWeb') || DEFAULT_VERSIONS['core-web'];
  const cloudInterop = map.get('cloudInterop') || DEFAULT_VERSIONS['cloud-interop'];
  const pkgVersion = map.get('pkgVersion') || DEFAULT_VERSIONS.major;

  // wsTo defaults to github-url version; wsFrom is optional (regex handles any version)
  const wsTo = map.get('wsTo') ?? `v${DEFAULT_VERSIONS['github-url']}`;

  return {
    core,
    coreWeb,
    cloudInterop,
    pkgVersion,
    wsTo,
    caseInsensitive: !!map.get('caseInsensitive'),
    includeRoot: map.has('includeRoot') ? true : true, // Apply to root per user instruction
    dryRun: !!map.get('dryRun'),
    skipInstall: !!map.get('skipInstall'),
    skipAudit: !!map.get('skipAudit'),
    skipBuild: !!map.get('skipBuild'),
    skipPrettier: !!map.get('skipPrettier'),
    failFast: !!map.get('failFast')
  };
}

function printHelp() {
  console.log(`Usage: node scripts/upgrade-versions.mjs [options]\n\n` +
    `Version overrides (defaults reflect current repo):\n` +
    `  --core <ver>             Set @openfin/core (default ${DEFAULT_VERSIONS.core})\n` +
    `  --cloud-interop <ver>    Set @openfin/cloud-interop (default ${DEFAULT_VERSIONS['cloud-interop']})\n` +
    `  --core-web <ver>         Set @openfin/core-web (default ${DEFAULT_VERSIONS['core-web']})\n` +
    `  --pkg-version <ver>      Set top-level package.json \"version\" (default ${DEFAULT_VERSIONS.major})\n\n` +
    `Find/replace versioned URLs in files (${VERSIONED_URL_EXTENSIONS.join(', ')}):\n` +
    `  --to <string>            Target version (default v${DEFAULT_VERSIONS['github-url']})\n` +
    `  URLs matching built-on-openfin.github.io/.../vX.X.X/ are automatically updated\n\n` +
    `Scope & behavior:\n` +
    `  --include-root           Include the root project (enabled by default)\n` +
    `  --dry-run                Show changes, do not write or run commands\n` +
    `  --skip-install           Skip npm install\n` +
    `  --skip-audit             Skip npm audit fix (note: audit is best-effort/non-fatal by default)\n` +
    `  --skip-build             Skip npm run build (if present)\n` +
    `  --skip-prettier          Skip npm run prettier (if a prettier script exists)\n` +
    `  --fail-fast              Stop on first failure\n`);
}

function updatePackageVersions(pkgJson, versions) {
  const updates = [];

  const sections = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
  const setIfPresent = (section, name, newVer) => {
    if (pkgJson?.[section]?.[name] !== undefined) {
      const old = pkgJson[section][name];
      if (old !== newVer) {
        pkgJson[section][name] = newVer;
        updates.push(`Set ${section}[${name}] ${old} -> ${newVer}`);
      }
    }
  };

  for (const sec of sections) {
    setIfPresent(sec, '@openfin/core', versions.core);
    setIfPresent(sec, '@openfin/cloud-interop', versions.cloudInterop);
    setIfPresent(sec, '@openfin/core-web', versions.coreWeb);
  }

  if (typeof pkgJson.version === 'string' && pkgJson.version !== versions.pkgVersion) {
    updates.push(`Set version ${pkgJson.version} -> ${versions.pkgVersion}`);
    pkgJson.version = versions.pkgVersion;
  }

  return updates;
}

async function replaceVersionedUrls(projectPath, args) {
  const excludePatterns = EXCLUDED_DIRECTORIES.map((e) => `!**/${e}/**`);
  const includePatterns = VERSIONED_URL_EXTENSIONS.map((ext) => `**/*${ext}`);

  const files = await FastGlob([...includePatterns, '!package.json', ...excludePatterns], {
    cwd: projectPath,
    dot: true
  });

  if (!files.length) return 0;

  const to = args.wsTo;
  const total = { changed: 0 };

  // Regex pattern for versioned URLs (matches built-on-openfin.github.io/.../vX.X.X/)
  const urlVersionPattern = /(built-on-openfin\.github\.io\/[^/]+\/[^/]+\/)v\d+\.\d+\.\d+\//g;

  for (const rel of files) {
    const abs = path.join(projectPath, rel);
    try {
      const content = await fs.readFile(abs, 'utf8');
      const newContent = content.replace(urlVersionPattern, `$1${to}/`);

      if (newContent !== content) {
        total.changed += 1;
        if (!args.dryRun) {
          await fs.writeFile(abs, newContent, 'utf8');
        } else {
          console.log(`[DRY-RUN] Would replace in ${abs}`);
        }
      }
    } catch (e) {
      console.warn(`[WARN] Could not process ${abs}: ${e?.message || e}`);
    }
  }

  console.log(`Find/replace updated ${total.changed} file(s) in ${projectPath}`);
  return total.changed;
}

async function loadJson(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

async function writeJson(filePath, obj, options = {}) {
  const indent = detectJsonIndent(options.originalText);
  const eol = detectEol(options.originalText) ?? '\n';
  const content = JSON.stringify(obj, null, indent) + eol;
  await fs.writeFile(filePath, content, 'utf8');
}

function detectJsonIndent(originalText) {
  // Try to preserve current style; default to 2 spaces.
  if (typeof originalText !== 'string' || originalText.length === 0) return 2;

  // If the file uses tabs for indentation, keep it.
  const tabIndented = /\n\t+"/.test(originalText) || /^\t+"/m.test(originalText);
  if (tabIndented) return '\t';

  // Otherwise infer the smallest indentation used for top-level properties.
  const matches = originalText.matchAll(/\n( +)"/g);
  let min = Infinity;
  for (const m of matches) {
    if (m[1].length > 0) min = Math.min(min, m[1].length);
  }
  if (Number.isFinite(min) && min > 0) return min;

  return 2;
}

function detectEol(originalText) {
  if (typeof originalText !== 'string') return undefined;
  if (originalText.includes('\r\n')) return '\r\n';
  if (originalText.includes('\n')) return '\n';
  return undefined;
}

async function fileExists(filename) {
  try {
    const stats = await fs.stat(filename);
    return stats.isFile();
  } catch {
    return false;
  }
}

async function runShellCmd(app, args, cwd, options) {
  if (options?.dryRun) {
    console.log(`[DRY-RUN] Would run: ${app} ${args.join(' ')} (cwd=${cwd})`);
    return;
  }

  await new Promise((resolve, reject) => {
    console.log(`${app} ${args.join(' ')}`);
    const osCommand = process.platform.startsWith('win') ? `${app}.cmd` : app;
    const sp = spawn(osCommand, args, { stdio: 'inherit', shell: true, cwd });
    sp.on('exit', (exitCode, signals) => {
      if (Number.parseInt(exitCode, 10) !== 0 || (signals && signals.length)) {
        reject(new Error(`${app} ${args.join(' ')} failed`));
      } else {
        resolve();
      }
    });
  });
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
