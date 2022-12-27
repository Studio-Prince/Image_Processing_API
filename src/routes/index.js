"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_js_1 = require("./api/image.js");
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('Root API route');
});
routes.use('/image', image_js_1.image);
exports.default = routes;
