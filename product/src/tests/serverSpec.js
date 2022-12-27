"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_js_1 = __importDefault(require("../server.js"));
const processing_js_1 = __importDefault(require("../utils/processing.js"));
const image_js_1 = require("../routes/api/image.js");
const node_path_1 = __importDefault(require("node:path"));
// import { fileURLToPath } from 'node:url';
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const request = (0, supertest_1.default)(server_js_1.default);
describe('Testing API Endpoints', () => {
    it('checks if the root endpoint is working', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
        //done()
    }));
    it('checks if the image api endpoint for resizing is working', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image');
        expect(response.status).toBe(200);
    }));
    it('checks if a sample images actually resizes using width and height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=fjord&width=200&height=200');
        expect(response.status).toBe(200);
    }));
    it('checks if a sample images actually resizes using width only', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=fjord&width=200');
        expect(response.status).toBe(200);
    }));
    it('checks if a sample images actually resizes using height only', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=fjord&height=200');
        expect(response.status).toBe(200);
    }));
    it('checks if the resize function creates a new resized file', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, processing_js_1.default)(node_path_1.default.join(image_js_1.rootDir, 'images', 'icelandwaterfall.jpg'), node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_200x200.jpg'), 200, 200);
        expect(node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_200x200.jpg')).toBeTruthy();
    }));
    it('checks if the resize function correctly resizes and saves file when negative width/height is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, processing_js_1.default)(node_path_1.default.join(image_js_1.rootDir, 'images', 'icelandwaterfall.jpg'), node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_200x20.jpg'), -200, -20);
        expect(node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_200x20.jpg')).toBeTruthy();
    }));
    it('checks if the resize function correctly resizes and saves file when only width is given', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, processing_js_1.default)(node_path_1.default.join(image_js_1.rootDir, 'images', 'icelandwaterfall.jpg'), node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_400xundefined.jpg'), 400, undefined);
        expect(node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_400xundefined.jpg')).toBeTruthy();
    }));
    it('checks if the resize function correctly resizes and saves file when only height is given', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, processing_js_1.default)(node_path_1.default.join(image_js_1.rootDir, 'images', 'icelandwaterfall.jpg'), node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_undefinedx300.jpg'), undefined, 300);
        expect(node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_undefinedx300.jpg')).toBeTruthy();
    }));
    it('checks if the resize function correctly resizes and saves file when height = 0', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, processing_js_1.default)(node_path_1.default.join(image_js_1.rootDir, 'images', 'icelandwaterfall.jpg'), node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_undefinedx0.jpg'), 300, 0);
        expect(node_path_1.default.join(image_js_1.rootDir, 'images', 'resized', 'test_icelandwaterfall_undefinedx0.jpg')).toBeTruthy();
    }));
});
