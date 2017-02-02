'use strict';

const acorn = require( 'acorn' );
const walk = require( 'acorn/dist/walk' );
const escodegen = require( 'escodegen' );

/**
 * Uses acorn https://github.com/ternjs/acorn#main-parser to parse and
 * escodegen to generate file body from AST.
 */
module.exports = function( source ) {
	const comments = [];
	const tokens = [];

	const ast = acorn.parse( source, {
		sourceType: 'module',
		ranges: true,
		onComment: comments,
		onToken: tokens
	} );

	const that = this;

	walk.simple( ast, {
		CallExpression( node ) {
			if ( node.callee.name !== 't' ) {
				return;
			}

			if ( node.arguments[ 0 ].type !== 'Literal' ) {
				console.error( 'First T call argument should be literal type' );

				return;
			}

			node.arguments[ 0 ].value = that.options.translateString( node.arguments[0].value );
		}
	} );

	escodegen.attachComments( ast, comments, tokens );
	const output = escodegen.generate( ast, { comment: true } );

	return output;
};
