import js from '@eslint/js';
import ts from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import';
import promise from 'eslint-plugin-promise';
import globals from 'globals';

const TYPESCRIPT_FILES = ['**/*.ts'];
const JS_TS_FILES = ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts'];

const typeCheckedTsConfigs = ts.configs.recommendedTypeChecked.map((config) => {
	/** @type {import('eslint').Linter.FlatConfig} */
	const merged = {
		...config,
		files: TYPESCRIPT_FILES,
		languageOptions: {
			...config.languageOptions,
			parserOptions: {
				...config.languageOptions?.parserOptions,
				project: './tsconfig.eslint.json',
				tsconfigRootDir: process.cwd()
			}
		}
	};

	return merged;
});

export default [
	{
		name: 'openfin-web-starter/ignores',
		ignores: [
			'**/dist/**',
			'**/node_modules/**',
			'**/*.bundle.js',
			'**/build/**/*.js',
			'**/wc-fin/*.js',
			'**/3rd-party/**',
			'**/*.d.ts',
			'**/settings.schema.json',
			'**/reports/**',
			'**/public/js/preload.js',
			'**/eslint.config.js',
			'**/eslint.config.mjs'
		]
	},

	js.configs.recommended,
	importPlugin.flatConfigs.recommended,
	promise.configs['flat/recommended'],

	{
		name: 'openfin-web-starter/base',
		files: JS_TS_FILES,
		linterOptions: {
			reportUnusedDisableDirectives: 'off'
		},
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				fin: 'readonly',
				fdc3: 'readonly',
				OpenFin: 'readonly'
			}
		},
		rules: {
			// Keep import checks compatible with the monorepo layout.
			'import/no-unresolved': 'off',
			'import/named': 'off',
			'import/no-duplicates': 'error',

			// Import ordering matches the legacy workspace configs.
			'import/order': [
				'warn',
				{
					groups: [
						['external', 'builtin'],
						['internal', 'index', 'sibling', 'parent']
					],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					}
				}
			],

			// Allow common unused callback parameters.
			'no-unused-vars': ['error', { args: 'none' }],

			// Some workspaces intentionally resolve promises multiple ways.
			'promise/no-multiple-resolved': 'off',

			// Security: crypto.randomUUID isn't available in non-secure contexts.
			'no-restricted-syntax': [
				'error',
				{
					selector:
						":matches(MemberExpression[object.name='crypto'][property.name='randomUUID'],MemberExpression[object.object.name='window'][object.property.name='crypto'][property.name='randomUUID'])",
					message:
						"window.crypto.randomUUID is not allowed because it is not available in non-secure contexts, use randomUUID from the uuid module instead"
				}
			]
		}
	},

	...typeCheckedTsConfigs,

	{
		name: 'openfin-web-starter/ts-overrides',
		files: TYPESCRIPT_FILES,
		rules: {
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksVoidReturn: false
				}
			],
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { args: 'none' }]
		}
	},

	{
		name: 'openfin-web-starter/jsdoc-typescript',
		files: TYPESCRIPT_FILES,
		...jsdoc.configs['flat/recommended-typescript'],
		settings: {
			jsdoc: {
				ignoreInternal: true,
				mode: 'typescript'
			}
		},
		rules: {
			...jsdoc.configs['flat/recommended-typescript'].rules,
			// Keep the rule enabled, but don't block lint runs on migration cleanup.
			'jsdoc/require-jsdoc': 'warn',
			'jsdoc/check-tag-names': 'off'
		}
	}
];
