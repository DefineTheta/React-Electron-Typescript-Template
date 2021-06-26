const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');
const envPath =
	process.env.NODE_ENV === 'development'
		? rootPath + '/env/' + 'electron.development.env'
		: rootPath + '/env/' + 'electron.production.env';

module.exports = {
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin()],
	},
	devtool: 'source-map',
	entry: path.resolve(rootPath, 'electron', 'main.ts'),
	target: 'electron-main',
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	externals: {
		knex: 'commonjs knex',
	},
	node: {
		__dirname: false,
	},
	output: {
		path: path.resolve(rootPath, 'dist'),
		filename: '[name].js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.ROOT_PATH': JSON.stringify(rootPath),
		}),
		new Dotenv({
			path: envPath,
		}),
		new ForkTsCheckerWebpackPlugin({
			eslint: {
				files: './**/*.{ts,tsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
			},
		}),
	],
};
