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
		entry: './client/src/content/intents.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'intents.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/view-contact.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'view-contact.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/content/view-quote.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'view-quote.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	}
];
