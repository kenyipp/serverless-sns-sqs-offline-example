"use strict";
const AWS = require("aws-sdk");
const Joi = require("joi");
const logger = require("../utils/logger");
const awsHelper = require("../utils/awsHelper");

const bodySchema = Joi.object({
	destionation: Joi
		.string()
		.allow(["firstQueue", "secondQueue", "lambdaFunction"])
		.description("The destionation you want to forward the payload to")
		.required(),
	payload: Joi
		.object()
		.default({})
		.description("The message payload to forward to")
});

module.exports.handler = async function (event) {
	let body;

	try {
		event.body = JSON.parse(event.body);
		const { error, value } = Joi.validate(
			event.body,
			bodySchema,
			{ abortEarly: false }
		);
		if (error) throw error;
		body = value;

		const sns = new AWS.SNS({
			endpoint: process.env.NODE_ENV === "production" ? void 0 : "http://127.0.0.1:4002",
			region: process.env.AWS_DEPLOY_REGION
		});

		await sns.publish({
			Message: JSON.stringify(body),
			TopicArn: awsHelper.SNS.getArn(body.destionation)
		}).promise();

		return {};

	} catch (error) { 
		logger.debug(error);
		return { statusCode: 400, body: error.message };
	}

}
