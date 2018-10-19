define(function (require, exports, module) {
	
var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");

"use strict";

CodeMirror.defineMode("audit", function() {

  var lineCommentStartSymbol = "#";

  return {

    startState: function() {
      return {
        tokenize: null
      };
    },

    token: function(stream, state) {

      if (state.tokenize) {
        return state.tokenize(stream, state);
      }

      var cur, ch = stream.next();

      if (ch === lineCommentStartSymbol) {
        stream.skipToEnd();
        return "comment";
      }

      if (ch === '<') {
        stream.skipTo('>');
        return "tag";
      }

      if (ch === "'") {
        stream.skipTo("'");
        return "string";
      }

      if (ch === '"') {
        stream.skipTo('"');
        return "string";
      }

      if (/\w|_|\s/.test(ch)) {
        stream.eatWhile(/\w|_|\s/);
        if (stream.eat(":")) return 'tag';
      }

      if (/\d/.test(ch)) {
        stream.eatWhile(/\d/);
        return "number";
      }

    },

      lineComment: lineCommentStartSymbol
    };
  });

});
