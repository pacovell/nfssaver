/*\
title: $:/plugins/pacovell/nfssaver/saver.js
type: application/javascript
module-type: saver

Handles saving changes via the Native File System API 

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
/*global idbKeyval */
"use strict";

/*
Select the appropriate saver module and set it up
*/
var NfsSaver = function(wiki) {
	this.idbKeyval = require("$:/plugins/pacovell/nfssaver/idb-keyval-iife.js").idbKeyval;
	wiki.nfsSaver = this;
};

NfsSaver.prototype.save = function(text,method,callback,options) {
	options = options || {};
	var self = this;

	(async() => {
		var handle = await self.getHandle();

		if (handle) {
		 	var writable = await handle.createWritable();
		 	await writable.write(text);	
		 	await writable.close();
		 }

		// Callback that we succeeded
		callback(null);
	})();
	return true;
};

/*
Information about this saver
*/
NfsSaver.prototype.info = {
	name: "download",
	priority: 100
};

/*
Get handle
*/
NfsSaver.prototype.getHandle = async function() {
	return this.idbKeyval.get('nfsSaverFileLocation');
};

NfsSaver.prototype.setHandle = function(handle) {
	this.idbKeyval.set('nfsSaverFileLocation', handle);
}

Object.defineProperty(NfsSaver.prototype.info, "capabilities", {
	get: function() {
		var capabilities = ["save", "download"];
		if(($tw.wiki.getTextReference("$:/config/NfsSaver/AutoSave") || "").toLowerCase() === "yes") {
			capabilities.push("autosave");
		}
		return capabilities;
	}
});

/*
Static method that returns true if this saver is capable of working
*/
exports.canSave = function(wiki) {
	return document.createElement("a").download !== undefined;
};

/*
Create an instance of this saver
*/
exports.create = function(wiki) {
	wiki.nfsSaver = new NfsSaver(wiki);
	return wiki.nfsSaver;
};




})();
