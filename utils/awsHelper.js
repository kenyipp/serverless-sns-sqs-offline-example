"use strict";

function SNS(topic) {
	if (!topic) throw new Error("Invalid topic");
	return Object.keys(this).reduce((proxy, key) => {
		proxy[key] = this[key].bind(SNS, topic); // eslint-disable-line no-param-reassign
		return proxy;
	});
}

SNS.getFullTopic = function (topic) {
	const { SERVICE, NODE_ENV } = process.env;
	return [SERVICE, NODE_ENV, "sns", topic].join("-");
};

SNS.getArn = function (topic) {
	const { NODE_ENV, AWS_DEPLOY_REGION, AWS_ACCOUNT_ID } = process.env;
	const fullTopic = this.getFullTopic(topic);
	return [
		"arn:aws:sns",
		AWS_DEPLOY_REGION,
		// 123456789012 is the accountId of sns-offline
		NODE_ENV === "development" ? "123456789012" : AWS_ACCOUNT_ID,
		fullTopic,
	].join(":");
};

function SQS(queueName) {
	if (!queueName) throw new Error("Invalid queue name");
	return Object.keys(this).reduce((proxy, key) => {
		proxy[key] = this[key].bind(SQS, queueName); // eslint-disable-line no-param-reassign
		return proxy;
	});
}

SQS.getUrl = function (queueName) {
	const {
		NODE_ENV, AWS_DEPLOY_REGION, AWS_ACCOUNT_ID, SERVICE,
	} = process.env;

	const fullName = [SERVICE, NODE_ENV, "sqs", queueName].join("-");

	if (NODE_ENV === "development") {
		return [
			"http://localhost:9324",
			"queue",
			fullName,
		].join("/");
	}

	return [
		`https://sqs.${AWS_DEPLOY_REGION}.amazonaws.com`,
		AWS_ACCOUNT_ID,
		fullName,
	].join("/");
};

function Lambda(functionName) {
	if (!functionName) throw new Error("Invalid topic");
	return Object.keys(this).reduce((proxy, key) => {
		proxy[key] = this[key].bind(Lambda, functionName); // eslint-disable-line no-param-reassign
		return proxy;
	});
}

Lambda.getFullFunctionName = function (functionName) {
	const { SERVICE, NODE_ENV } = process.env;
	return [SERVICE, NODE_ENV, functionName].join("-");
};

module.exports = {
	SNS,
	SQS,
	Lambda,
};
