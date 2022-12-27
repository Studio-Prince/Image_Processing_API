import { accessSync, constants } from 'node:fs';
import path from 'node:path';

function checkFileExists(filePath: string): boolean {
try {
accessSync(filePath, constants.F_OK);
return true;
} catch (error) {
return false;
}
}

function getProjectRoot(
currentFilePath: string,
numberOfStepsToRoot: number
): string {
//const __filename = fileURLToPath(import.meta.url);
const dirPath = path.dirname(currentFilePath);
const dirPathArray = dirPath.split(path.sep);
const projectDirectory = path.normalize(
dirPathArray.slice(0, -numberOfStepsToRoot).join('/')
);

return projectDirectory;
}

export { checkFileExists, getProjectRoot };