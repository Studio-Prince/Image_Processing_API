import sharp from 'sharp';

async function image_resize(
imagePath: string,
writePath: string,
width: number | undefined,
height: number | undefined
): Promise<object> {
const newWidth = (width as number) ? Math.abs(width as number) : undefined;
const newHeight = (height as number)
? Math.abs(height as number)
: undefined;

return await sharp(imagePath).resize(newWidth, newHeight).toFile(writePath);
}

export default image_resize;