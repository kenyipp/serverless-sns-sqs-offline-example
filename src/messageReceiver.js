"use strict";

async function handler(event) {
	console.log(JSON.stringify(event, null, 4));
}

module.exports.handler = handler;
