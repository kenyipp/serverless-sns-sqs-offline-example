"use strict";

module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es6": true,
		"browser": true
	},
	"extends": [
		"airbnb-base"
	],
	"parserOptions": {
		"ecmaVersion": 2019,
		"sourceType": "module",
		"ecmaFeatures": {
			// "experimentalObjectRestSpread": true,
			"jsx": true
		}
	},
	"rules": {
		"no-console": "off",
		"indent": [2, "tab"],
		"no-tabs": 0,
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	},
	"overrides": [
		{
			"files": ["*.*"],
			"rules": {
				"strict": "off"
			}
		}
	]
};
