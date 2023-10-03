"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
new server_1.Application((_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : "3000");
