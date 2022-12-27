"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootDir = exports.image = void 0;
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = require("node:url");
const processing_js_1 = __importDefault(require("../../utils/processing.js"));
const fs_utils_js_1 = require("../../utils/fs_utils.js");
const __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
const rootDir = (0, fs_utils_js_1.getProjectRoot)(__filename, 3);
exports.rootDir = rootDir;
// TODO: Display error message when user inputs text/string as input to height/width
const image = express_1.default.Router();
exports.image = image;
image.get('/', (req, res) => {
    const userQuery = req.query;
    const fileName = userQuery.filename;
    const imageFile = fileName + '.jpg';
    //check if file name exists
    const fullPath = node_path_1.default.join(rootDir, 'images', `${imageFile}`);
    if ((0, fs_utils_js_1.checkFileExists)(fullPath)) {
        const width = parseInt(userQuery.width) || undefined;
        const height = parseInt(userQuery.height) || undefined;
        if (userQuery.filename && !userQuery.width && !userQuery.height) {
            res.sendFile(node_path_1.default.join(rootDir, 'images', `${imageFile}`));
        }
        else if (req.query.filename && (width || height)) {
            // before resizing, check if file already exists then serve it, else resize afresh
            const queryImage = node_path_1.default.join(rootDir, 'images', 'resized', `${fileName}_${width}x${height}.jpg`);
            if ((0, fs_utils_js_1.checkFileExists)(queryImage)) {
                res.sendFile(queryImage);
            }
            else {
                (0, processing_js_1.default)(node_path_1.default.join(rootDir, 'images', `${imageFile}`), node_path_1.default.join(rootDir, 'images', 'resized', `${fileName}_${width}x${height}.jpg`), width, height).then(() => {
                    res.sendFile(node_path_1.default.join(rootDir, 'images', 'resized', `${fileName}_${width}x${height}.jpg`));
                });
            }
        }
    }
    else {
        res.send('Image API is active but image is not specified or does not exist. Verify image, then try again');
    }
});
