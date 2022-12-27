"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectRoot = exports.checkFileExists = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
function checkFileExists(filePath) {
    try {
        (0, node_fs_1.accessSync)(filePath, node_fs_1.constants.F_OK);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.checkFileExists = checkFileExists;
function getProjectRoot(currentFilePath, numberOfStepsToRoot) {
    //const __filename = fileURLToPath(import.meta.url);
    const dirPath = node_path_1.default.dirname(currentFilePath);
    const dirPathArray = dirPath.split(node_path_1.default.sep);
    const projectDirectory = node_path_1.default.normalize(dirPathArray.slice(0, -numberOfStepsToRoot).join('/'));
    return projectDirectory;
}
exports.getProjectRoot = getProjectRoot;
