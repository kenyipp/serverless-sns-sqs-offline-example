"use strict";

async function handler(event) {
	console.log("FINISHED", JSON.stringify(event, null, 4));
}

module.exports.handler = handler;
