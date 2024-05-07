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
		entry: './client/src/client.ts',
		devtool: 'source-map',
		module: {
			rules
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'client.web.api.bundle.js',
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
	}
];
