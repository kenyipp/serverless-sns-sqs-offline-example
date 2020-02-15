"use strict";
const AWS = require("aws-sdk");
const awsHelper = require("../utils/awsHelper");
const logger = require("../utils/logger");

module.exports.handler = async function (event) {

	console.log(JSON.stringify(event, null, 4));

	const sqs = new AWS.SQS();

	try {
		const body = JSON.parse(event.Records[0].Sns.Message);
		console.log(awsHelper.SQS.getUrl(body.destionation));
		await sqs.sendMessage({
			MessageBody: JSON.stringify(body.payload),
			QueueUrl: awsHelper.SQS.getUrl(body.destionation)
		}).promise();

	} catch (error) {
		logger.error(error);
	}

};
