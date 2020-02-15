"use strict";

const _ = require("lodash");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const mode = slsw.lib.webpack.isLocal ? "development" : "production";

async function getConfig() {

	const aws = slsw.lib.serverless.providers.aws;
	const awsAccountId = await aws.getAccountId();

	const env = {
		NODE_ENV: mode,
		AWS_ACCOUNT_ID: awsAccountId
	};

	_.assign(process.env, env);

	return {
		entry: slsw.lib.entries,
		devtool: "source-map",
		target: "node",
		mode: mode,
		externals: [nodeExternals()],
		module: {},
		optimization: {
			minimize: true
		},
		plugins: [
			new LodashModuleReplacementPlugin
		]
	};
	
}

module.exports = getConfig();
