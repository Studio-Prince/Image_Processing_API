'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./routes/index.js"));
// Constants
const PORT = 8090;
const HOST = '0.0.0.0';
// App
const app = (0, express_1.default)();
app.use('/api', index_js_1.default);
// start the Express Server
app.listen(PORT, HOST, () => {
    console.log(`VS code console? Running on http://${HOST}:${PORT}`);
});
exports.default = app;
