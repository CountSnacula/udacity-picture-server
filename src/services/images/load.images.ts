import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import * as fse from 'fs-extra';
import resizeImg from 'resize-img';
import { ensureDir } from 'fs-extra';

const IMAGE_ROOT = '../../../images';
const IMAGE_ORIGINAL = path.resolve(__dirname, IMAGE_ROOT, 'original');
const IMAGE_RESIZED = path.resolve(__dirname, IMAGE_ROOT, 'resized');

function resolveImagePath(name: string): string {
  console.log(IMAGE_ORIGINAL);
  return path.join(IMAGE_ORIGINAL, name);
}

function doesBaseFileExists(name: string): boolean {
  return fse.pathExistsSync(resolveImagePath(name));
}

function getResizedFileName(
  name: string,
  width?: number,
  height?: number,
): string {
  return `${width}_${height}_${name}`;
}

async function doesResizedImgExists(path: string): Promise<boolean> {
  return fse.pathExists(path);
}

async function resize(
  file: Buffer,
  width?: number,
  height?: number,
): Promise<Buffer> {
  return await resizeImg(file, {
    width,
    height,
  });
}

async function loadFile(path: string): Promise<Buffer> {
  return readFileSync(path);
}

async function loadBaseFile(name: string): Promise<Buffer> {
  const filePath = resolveImagePath(name);
  console.log(`File path ${filePath}`);
  return loadFile(filePath);
}

async function saveResized(filePath: string, file: Buffer): Promise<void> {
  await ensureDir(IMAGE_RESIZED);
  console.log(`Creating resized file. Path ${filePath}`);
  writeFileSync(filePath, file);
}

const loadImage = async (
  name: string,
  width?: number,
  height?: number,
): Promise<Buffer> => {
  const exist = doesBaseFileExists(name);
  if (!exist) {
    throw new Error(`File with name ${name} does not exist`);
  }

  let file: Buffer;
  if (!width && !height) {
    console.log('No Resize loading base file.');
    file = await loadBaseFile(name);
  } else {
    const resizedFileName = getResizedFileName(name, width, height);
    const resizedFilePath = path.join(IMAGE_RESIZED, resizedFileName);
    const existResize = await doesResizedImgExists(
      path.join(IMAGE_RESIZED, resizedFileName),
    );
    if (!existResize) {
      console.log('Loading base file for resizing');
      file = await loadBaseFile(name);
      file = await resize(file, width, height);
      await saveResized(resizedFilePath, file);
    } else {
      console.log('ResizedFile found loading it.');
      file = await loadFile(resizedFilePath);
    }
  }

  return file;
};

export default loadImage;
