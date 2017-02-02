/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* jshint browser: false, node: true, strict: true */

const path = require( 'path' );
const CKEditorWebpackPlugin = require( './node_modules/@ckeditor/ckeditor5-dev-webpack-plugin' );

module.exports = {
	context: __dirname,
	target: 'web',

	entry: './webpack-entry-point',

	output: {
		path: path.join( 'build', 'dist' ),
		filename: 'ckeditor.js',
	},

	module: {
		rules: [
			{
				// test: **/ckeditor5-*/theme/icons/*.svg
				test: /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				// test: **/ckeditor5-*/theme/**/*.scss
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},

			// TODO: add loaders on the fly by the plugin.
			{
				test: /ckeditor5-[^/]+\/src\/.+\.js$/,
				use: [ require.resolve( 'callback-loader' ) ]
			}
		]
	},

	devtool: 'cheap-source-map',

	plugins: [
		new CKEditorWebpackPlugin( {
			languages: [ 'pl' ]
		} )
	]
};
