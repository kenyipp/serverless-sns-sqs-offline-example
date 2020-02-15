"use strict";

function SNS(topic) {
	if (!topic)
		throw new Error("Invalid topic");
	return Object.keys(this).reduce((proxy, key) => {
		proxy[key] = this[key].bind(SNS, topic);
		return proxy;
	});
}

SNS.getFullTopic = function (topic) {
	const { SERVICE, STAGE } = process.env;
	return [SERVICE, STAGE, "sns", topic].join("-");
};

SNS.getArn = function (topic) {
	const fullTopic = this.getFullTopic(topic);
	const { NODE_ENV, AWS_REGION, AWS_ACCOUNT_ID } = process.env;
	return [
		"arn:aws:sns", 
		AWS_REGION, 
		// 123456789012 is the accountId of sns-offline
		NODE_ENV === "development" ? "123456789012" : AWS_ACCOUNT_ID,
		fullTopic
	].join(":");
};

function Lambda(functionName) {
	if (!functionName)
		throw new Error("Invalid topic");
	return Object.keys(this).reduce((proxy, key) => {
		proxy[key] = this[key].bind(Lambda, functionName);
		return proxy;
	});
}

Lambda.getFullFunctionName = function (functionName) {
	const { SERVICE, STAGE } = process.env;
	return [SERVICE, STAGE, functionName].join("-");
};

module.exports = {
	SNS: SNS,
	Lambda: Lambda
};
