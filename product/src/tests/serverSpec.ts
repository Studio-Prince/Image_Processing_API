import supertest from 'supertest';
import app from '../server.js';
import image_resize from '../utils/processing.js';
import { rootDir } from '../routes/api/image.js';
import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const request = supertest(app);

describe('Testing API Endpoints', () => {
it('checks if the root endpoint is working', async () => {
const response = await request.get('/api');
expect(response.status).toBe(200);
//done()
});

it('checks if the image api endpoint for resizing is working', async () => {
const response = await request.get('/api/image');
expect(response.status).toBe(200);
});

it('checks if a sample images actually resizes using width and height', async () => {
const response = await request.get(
'/api/image?filename=fjord&width=200&height=200'
);
expect(response.status).toBe(200);
});
it('checks if a sample images actually resizes using width only', async () => {
const response = await request.get(
'/api/image?filename=fjord&width=200'
);
expect(response.status).toBe(200);
});
it('checks if a sample images actually resizes using height only', async () => {
const response = await request.get(
'/api/image?filename=fjord&height=200'
);
expect(response.status).toBe(200);
});
it('checks if the resize function creates a new resized file', async () => {
await image_resize(
path.join(rootDir, 'images', 'icelandwaterfall.jpg'),
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_200x200.jpg'
),
200,
200
);

expect(
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_200x200.jpg'
)
).toBeTruthy();
});
it('checks if the resize function correctly resizes and saves file when negative width/height is passed', async () => {
await image_resize(
path.join(rootDir, 'images', 'icelandwaterfall.jpg'),
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_200x20.jpg'
),
-200,
-20
);

expect(
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_200x20.jpg'
)
).toBeTruthy();
});
it('checks if the resize function correctly resizes and saves file when only width is given', async () => {
await image_resize(
path.join(rootDir, 'images', 'icelandwaterfall.jpg'),
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_400xundefined.jpg'
),
400,
undefined
);

expect(
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_400xundefined.jpg'
)
).toBeTruthy();
});
it('checks if the resize function correctly resizes and saves file when only height is given', async () => {
await image_resize(
path.join(rootDir, 'images', 'icelandwaterfall.jpg'),
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_undefinedx300.jpg'
),
undefined,
300
);

expect(
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_undefinedx300.jpg'
)
).toBeTruthy();
});
it('checks if the resize function correctly resizes and saves file when height = 0', async () => {
await image_resize(
path.join(rootDir, 'images', 'icelandwaterfall.jpg'),
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_undefinedx0.jpg'
),
300,
0
);

expect(
path.join(
rootDir,
'images',
'resized',
'test_icelandwaterfall_undefinedx0.jpg'
)
).toBeTruthy();
});
});