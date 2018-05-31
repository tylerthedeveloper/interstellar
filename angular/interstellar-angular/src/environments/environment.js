"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
exports.__esModule = true;
var _firebase_1 = require("../../_firebase");
exports.environment = {
    production: false,
    apiUrl: 'http://localhost:4200',
    firebase: _firebase_1.firebaseConfig
};
