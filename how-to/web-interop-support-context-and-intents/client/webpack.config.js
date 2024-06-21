const path = require('path');

const rules = [
	{
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/
	}
];

module.exports = [
	{
		entry: './client/src/provider.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'provider.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/settings-dialog.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'settings-dialog.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/platform/iframe-broker.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'iframe-broker.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/fdc3-view.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'fdc3-view.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/fdc3-intent-view.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'fdc3-intent-view.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/interop-view.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'interop-view.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/interop-intent-view.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'interop-intent-view.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	}
];
