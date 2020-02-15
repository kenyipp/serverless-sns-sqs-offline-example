"use strict";

const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
	region: "ap-southeast-1",
	endpoint: "http://localhost:3200"
});

const payload = {
	body: { "hello": "world" }
};

lambda
	.invoke({
		FunctionName: "sns-sqs-offline-example-development-actionDispatcher",
		Payload: JSON.stringify(payload)
	}, (error, data) => {
		if (error)
			return console.error(error);
		return console.log(data);
	});
