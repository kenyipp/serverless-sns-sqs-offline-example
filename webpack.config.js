"use strict";

const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "production",
	target: "node",
	externals: [nodeExternals()],
	module: {},
};
