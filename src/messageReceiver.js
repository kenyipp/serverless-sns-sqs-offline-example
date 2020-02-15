"use strict";

module.exports.handler = async function(event){
	console.log(JSON.stringify(event, null, 4));
};
