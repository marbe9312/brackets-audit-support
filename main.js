define(function (require, exports, module) {

  "use strict";

  require('./lib/audit/audit');

  var LanguageManager = brackets.getModule("language/LanguageManager");

  LanguageManager.defineLanguage("audit", {
    name: "Nessus .audit",
    mode: "audit",
    fileExtensions: ["audit"]
  });

});

