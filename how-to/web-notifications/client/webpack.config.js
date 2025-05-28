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
		entry: './client/src/content/view1.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'view1.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/view2.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'view2.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	}
];
