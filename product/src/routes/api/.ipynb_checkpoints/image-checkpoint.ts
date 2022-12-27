import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import image_resize from '../../utils/processing.js';
import { checkFileExists, getProjectRoot } from '../../utils/fs_utils.js';

const __filename = fileURLToPath(import.meta.url);
const rootDir = getProjectRoot(__filename, 3);

// TODO: Display error message when user inputs text/string as input to height/width
const image = express.Router();

image.get('/', (req: express.Request, res: express.Response): void => {
const userQuery = req.query;
const fileName = userQuery.filename;
const imageFile = fileName + '.jpg';

//check if file name exists
const fullPath = path.join(rootDir, 'images',`${imageFile}`);
if (checkFileExists(fullPath)) {
const width = parseInt(userQuery.width as string) || undefined;
const height = parseInt(userQuery.height as string) || undefined;

if (userQuery.filename && !userQuery.width && !userQuery.height) {
res.sendFile(path.join(rootDir, 'images', `${imageFile}`));
} else if (req.query.filename && (width || height)) {
// before resizing, check if file already exists then serve it, else resize afresh
const queryImage = path.join(
rootDir,
'images',
'resized',
`${fileName}_${width}x${height}.jpg`
);
if (checkFileExists(queryImage)) {
res.sendFile(queryImage);
} else {
image_resize(
path.join(rootDir, 'images', `${imageFile}`),
path.join(
rootDir,
'images',
'resized',
`${fileName}_${width}x${height}.jpg`
),
width,
height
).then(() => {
res.sendFile(
path.join(
rootDir,
'images',
'resized',
`${fileName}_${width}x${height}.jpg`
)
);
});
}
}
} else {
res.send(
'Image API is active but image is not specified or does not exist. Verify image, then try again'
);
}
});

export { image, rootDir };