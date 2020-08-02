/*\
title: $:/plugins/pacovell/nfssaver/setfilelocation.js
type: application/javascript
module-type: widget

Widget that creates a button to select the local save file

<$setfilelocation/>

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const Widget = require("$:/core/modules/widgets/widget.js").widget;

const SetFileLocationWidget = function(parseTreeNode,options) {
  this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
SetFileLocationWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
SetFileLocationWidget.prototype.render = function(parent,nextSibling) {
  var self = this;

    // Remember parent
  this.parentDomNode = parent;

  // Compute attributes and execute state
  this.computeAttributes();
  this.execute();

  var domNode = this.document.createElement("div");
  var buttonNode = this.document.createElement("button");
  var statusNode = this.document.createElement("p");
  var currentHandle = $tw.wiki.nfsSaver.handle;

  buttonNode.addEventListener("click",function (event) {
      const opts = {
      type: 'save-file',
      accepts: [{
        description: 'HTML file',
        extensions: ['html'],
        mimeTypes: ['text/html'],
      }],
    };

    window.chooseFileSystemEntries(opts).then(function(handle) {
      $tw.wiki.nfsSaver.handle = handle;
    })
  });

  if (currentHandle) {
    statusNode.innerHTML = "<em>Save location set</em>";
  } else {
    statusNode.innerHTML = "<em>Not set</em>";
  }
  statusNode.style.display = "inline";

  buttonNode.innerHTML = "Set";
  buttonNode.style.display = "inline";
  buttonNode.style.marginLeft = "10px";

  // Populate top level element
  domNode.appendChild(statusNode);
  domNode.appendChild(buttonNode);

  // Insert element
  parent.insertBefore(domNode,nextSibling);
  this.renderChildren(domNode,null);
  this.domNodes.push(domNode);
}
;

exports["setfilelocation"] = SetFileLocationWidget;

})();