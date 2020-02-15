"use strict";

module.exports = {

	json(object) {
		return {
			body: JSON.stringify({
				status: 1,
				server_time: Date.now(),
				"version": "1.0",
				...object
			}),
		};
	},

	accepted(){
		return {
			statusCode: 202
		};
	},

	badRequest() {
		return {
			statusCode: 400
		};
	},

	forBidden() {
		return {
			statusCode: 403
		};
	},

	internalServerError() {
		return {
			statusCode: 500,
		}
	}

};
