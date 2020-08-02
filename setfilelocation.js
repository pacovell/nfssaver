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

  var tag = "button";
  var domNode = this.document.createElement(tag);
  domNode.addEventListener("click",function (event) {
      // $tw.Bob.Reconnect(this.sync);
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

  // Insert element
  parent.insertBefore(domNode,nextSibling);
  this.renderChildren(domNode,null);
  this.domNodes.push(domNode);


};


exports["setfilelocation"] = SetFileLocationWidget;

})();