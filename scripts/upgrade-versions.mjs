/**
 * Upgrade versions across root and all nested workspaces.
 *
 * What it does per project (root + each workspace):
  *  - Update @openfin/core-web version in package.json (if present)
  *  - Update @openfin/cloud-interop version in package.json (if present)
  *  - Update @openfin/core version in package.json (if present)
  *  - Update top-level "version" in package.json
  *  - Perform find/replace in .json and .md files (excluding package.json), skipping node_modules and common build/output dirs
  *  - Run: npm install, npm audit fix, npm run build (if script exists)
  *
  * Defaults (can be overridden with CLI flags). These reflect current repo values and can be edited before running:
  *   --core: 42.100.107
  *   --cloud-interop: 0.42.103
  *   --core-web: 0.42.103
  *   --pkg-version: 22.0.0
  *   --WS_VERSION_STRING_FROM/--WS_VERSION_STRING_TO: defaults provided; case-sensitive by default; excludes package.json by default
  *
  * CLI examples:
 *   node scripts/upgrade-versions.mjs --dry-run
 *   node scripts/upgrade-versions.mjs --core 42.101.1 --core-web 0.43.0 --pkg-version 22.1.0
 *   node scripts/upgrade-versions.mjs --from v21.0.0 --to v22.0.0
 *   node scripts/upgrade-versions.mjs --skip-audit --skip-build
 */

import { spawn } from 'child_process';
import FastGlob from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';

// ---------- Defaults (edit these before running if needed) ----------
const DEFAULT_CORE = '42.100.107';
const DEFAULT_CORE_WEB = '0.42.103';
const DEFAULT_CLOUD_INTEROP = '0.42.103';
const DEFAULT_PKG_VERSION = '22.0.0';

// Defaults for general find/replace (string literals)
// These can be overridden via CLI flags:
//   --WS_VERSION_STRING_FROM <string>
//   --WS_VERSION_STRING_TO <string>
const WS_VERSION_STRING_FROM = 'v22.0.0';
const WS_VERSION_STRING_TO = 'v22.0.0';

// Directories to exclude from search/replace
const DEFAULT_EXCLUDES = [
  'node_modules',
  'dist',
  'build',
  'out',
  'coverage',
  'public',
  '.next',
  '.cache',
  'tmp',
  'logs'
];

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
    WS_VERSION_STRING_FROM: args.wsFrom,
    WS_VERSION_STRING_TO: args.wsTo,
    caseInsensitive: args.caseInsensitive,
    includeRoot: args.includeRoot,
    dryRun: args.dryRun,
    skipInstall: args.skipInstall,
    skipAudit: args.skipAudit,
    skipBuild: args.skipBuild,
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
        await writeJson(pkgFile, pkgJson);
      } else if (before !== after) {
        console.log(`[DRY-RUN] Would update ${pkgFile}`);
      }

      // 2) General find/replace in .json and .md (excluding package.json)
      if (args.wsFrom !== undefined && args.wsTo !== undefined) {
        const changedCount = await replaceInDocsAndJson(abs, args);
        projectResult.filesChanged += changedCount;
      }

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
      // Preferred flags with defaults
      case '--WS_VERSION_STRING_FROM': set('wsFrom', next); i += 1; break;
      case '--WS_VERSION_STRING_TO': set('wsTo', next); i += 1; break;
      // Legacy aliases (kept for compatibility)
      case '--from': set('wsFrom', next); i += 1; break;
      case '--to': set('wsTo', next); i += 1; break;
      case '--case-insensitive':
      case '--ci': set('caseInsensitive', true); break;
      case '--include-root': set('includeRoot', true); break;
      case '--dry-run': set('dryRun', true); break;
      case '--skip-install': set('skipInstall', true); break;
      case '--skip-audit': set('skipAudit', true); break;
      case '--skip-build': set('skipBuild', true); break;
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

  const core = map.get('core') || DEFAULT_CORE;
  const coreWeb = map.get('coreWeb') || DEFAULT_CORE_WEB;
  const cloudInterop = map.get('cloudInterop') || DEFAULT_CLOUD_INTEROP;
  const pkgVersion = map.get('pkgVersion') || DEFAULT_PKG_VERSION;

  const wsFrom = map.get('wsFrom') ?? WS_VERSION_STRING_FROM;
  const wsTo = map.get('wsTo') ?? WS_VERSION_STRING_TO;

  return {
    core,
    coreWeb,
    cloudInterop,
    pkgVersion,
    // expose both new and legacy names
    wsFrom,
    wsTo,
    from: wsFrom,
    to: wsTo,
    caseInsensitive: !!map.get('caseInsensitive'),
    includeRoot: map.has('includeRoot') ? true : true, // Apply to root per user instruction
    dryRun: !!map.get('dryRun'),
    skipInstall: !!map.get('skipInstall'),
    skipAudit: !!map.get('skipAudit'),
    skipBuild: !!map.get('skipBuild'),
    failFast: !!map.get('failFast')
  };
}

function printHelp() {
  console.log(`Usage: node scripts/upgrade-versions.mjs [options]\n\n` +
    `Version overrides (defaults reflect current repo):\n` +
    `  --core <ver>             Set @openfin/core (default ${DEFAULT_CORE})\n` +
    `  --cloud-interop <ver>    Set @openfin/cloud-interop (default ${DEFAULT_CLOUD_INTEROP})\n` +
    `  --core-web <ver>         Set @openfin/core-web (default ${DEFAULT_CORE_WEB})\n` +
    `  --pkg-version <ver>      Set top-level package.json \"version\" (default ${DEFAULT_PKG_VERSION})\n\n` +
    `Find/replace in .json and .md (case-sensitive by default):\n` +
    `  --WS_VERSION_STRING_FROM <string>   String to replace (default ${WS_VERSION_STRING_FROM})\n` +
    `  --WS_VERSION_STRING_TO <string>     Replacement (default ${WS_VERSION_STRING_TO})\n` +
    `  (Legacy aliases still accepted: --from, --to)\n` +
    `  --ci | --case-insensitive  Case-insensitive replacement\n\n` +
    `Scope & behavior:\n` +
    `  --include-root           Include the root project (enabled by default)\n` +
    `  --dry-run                Show changes, do not write or run commands\n` +
    `  --skip-install           Skip npm install\n` +
    `  --skip-audit             Skip npm audit fix (note: audit is best-effort/non-fatal by default)\n` +
    `  --skip-build             Skip npm run build (if present)\n` +
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

async function replaceInDocsAndJson(projectPath, args) {
  const patterns = DEFAULT_EXCLUDES.map((e) => `**/${e}/**`);
  // All json & md files under projectPath, excluding package.json
  const files = await FastGlob(['**/*.json', '**/*.md', '!package.json', ...patterns.map((p) => `!${p}`)], {
    cwd: projectPath,
    dot: true
  });

  if (!files.length) return 0;

  const from = args.wsFrom;
  const to = args.wsTo;
  const total = { changed: 0 };

  for (const rel of files) {
    const abs = path.join(projectPath, rel);
    try {
      const content = await fs.readFile(abs, 'utf8');
      const newContent = replaceAll(content, from, to, args.caseInsensitive);
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

function replaceAll(input, from, to, caseInsensitive) {
  if (from === undefined || to === undefined) return input;
  const flags = caseInsensitive ? 'gi' : 'g';
  const re = new RegExp(escapeRegExp(from), flags);
  return input.replace(re, to);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function loadJson(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

async function writeJson(filePath, obj) {
  const content = JSON.stringify(obj, null, 2) + '\n';
  await fs.writeFile(filePath, content, 'utf8');
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
