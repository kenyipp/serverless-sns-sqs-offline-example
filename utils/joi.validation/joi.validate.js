"use strict";

require("./joi.language");

const Joi = require("joi");
const HttpError = require("../httpError");

const BadArguments = details => HttpError.Error(
	"BAD_ARGUMENTS",
	"invalid input",
	"request.body",
	details
);

const JoIError = (joiError) => HttpError.Error(
	joiError.type,
	joiError.message,
	joiError.path[0]
);

function validate(path) {
	return function (schema, options) {
		if (schema == null)
			throw new Error("Schema should not be empty");
		return function (event) {
			if (!event[path])
				event[path] = {};
			const body = event[path];
			const response = Joi.validate(body, schema, { abortEarly: false, ...options });
			if (response.error)
				throw HttpError.BadRequest(BadArguments(response.error.details.map(JoIError)));
			event[path] = response.value;
		};
	};
}

module.exports = validate("body");

module.exports.body = validate("body");

module.exports.query = validate("queryStringParameters");

module.exports.path = validate("pathParameters");
