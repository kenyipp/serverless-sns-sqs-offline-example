"use strict";

function HttpError(statusCode, error) {
	if (!(this instanceof HttpError)) {
		return new HttpError(statusCode, error);
	}

	this.statusCode = statusCode || 500;
	this.error = error;
	this.isAPIError = true;

	Error.captureStackTrace(this, HttpError);
}

function createGetter(code) {
	return function () {
		return function (error) {
			return new HttpError(code, error);
		};
	};
}

function ErrorDetail(code, message, target, details) {
	if (!(this instanceof ErrorDetail)) {
		return new ErrorDetail(code, message, target, details);
	}
	this.code = code;
	this.message = message;
	this.target = target;
	this.details = details;
}

HttpError.createError = function (statusCode, error) {
	return new HttpError(statusCode, error);
};

HttpError.handleError = function (rawError) {
	if (!rawError.isAPIError) {
		if (rawError instanceof HttpError.Error) {
			rawError = HttpError(400, rawError);
		} else {
			rawError = HttpError(500);
		}
	}

	if (rawError.error) {
		rawError.error = {
			status: 0,
			server_time: Date.now(),
			...rawError.error,
		};
	}

	return {
		statusCode: rawError.statusCode,
		body: JSON.stringify(rawError.error),
	};
};

module.exports = HttpError;

module.exports.Error = ErrorDetail;

Object.defineProperties(
	module.exports,
	{
		BadRequest: {
			configurable: true,
			enumerable: true,
			get: createGetter(400),
		},
		Unauthorized: {
			configurable: true,
			enumerable: true,
			get: createGetter(401),
		},
		PaymentRequired: {
			configurable: true,
			enumerable: true,
			get: createGetter(402),
		},
		Forbidden: {
			configurable: true,
			enumerable: true,
			get: createGetter(403),
		},
		NotFound: {
			configurable: true,
			enumerable: true,
			get: createGetter(404),
		},
		MethodNotAllowed: {
			configurable: true,
			enumerable: true,
			get: createGetter(405),
		},
		NotAcceptable: {
			configurable: true,
			enumerable: true,
			get: createGetter(406),
		},
		InternalServerError: {
			configurable: true,
			enumerable: true,
			get: createGetter(500),
		},
		NotImplemented: {
			configurable: true,
			enumerable: true,
			get: createGetter(501),
		},
		ServiceUnavailable: {
			configurable: true,
			enumerable: true,
			get: createGetter(503),
		},
	},
);
