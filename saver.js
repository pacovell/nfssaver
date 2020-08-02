/*\
title: $:/plugins/pacovell/nfssaver/saver.js
type: application/javascript
module-type: saver

Handles saving changes via the Native File System API 

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Select the appropriate saver module and set it up
*/
var NfsSaver = function(wiki) {
};

NfsSaver.prototype.save = function(text,method,callback,options) {
	options = options || {};
	// Get the current filename

	var handle = $tw.wiki.nfsSaver.handle;

	if (handle) {
		(async() => {
		 	var writable = await handle.createWritable();
		 	await writable.write(text);	
		 	await writable.close();

			// Callback that we succeeded
			callback(null);
		})();
	}
	return true;
};

/*
Information about this saver
*/
NfsSaver.prototype.info = {
	name: "download",
	priority: 100
};

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
