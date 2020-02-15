"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const awsHelper = require("../utils/awsHelper");
const logger = require("../utils/logger");

async function handler(event) {
	console.log(JSON.stringify(event, null, 4));

	const sqs = new AWS.SQS();

	try {
		const body = JSON.parse(event.Records[0].Sns.Message);

		await sqs.sendMessage({
			MessageBody: JSON.stringify(body.payload),
			QueueUrl: awsHelper.SQS.getUrl(body.destionation),
		}).promise();
	} catch (error) {
		logger.error(error);
	}
}

module.exports.handler = handler;
