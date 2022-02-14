import loadImage from '../../src/services/images/load.images';
import { readFileSync } from 'fs';
import * as path from 'path';
import { unlinkSync } from 'fs-extra';

describe('Load Image', () => {
  it('should throw an error when the image is not found.', async () => {
    const imgName = 'notFound.jpg';

    loadImage(imgName)
      .then((fileBuffer) => {
        expect(fileBuffer).toBeFalse();
      })
      .catch(() => {
        expect(true).toBe(true);
      });
  });

  it('should return the original image', async () => {
    const imgName = 'fjord.jpg';

    loadImage(imgName)
      .then((fileBuffer) => {
        expect(fileBuffer).toBeTruthy();
      })
      .catch(() => {
        expect(true).toBeFalse();
      });
  });

  it('should load the resized image', async () => {
    const imgName = 'fjord.jpg';
    const width = 50;
    const height = 50;
    const oriImage = readFileSync(
      path.join(__dirname, '..', '..', 'images', 'original', imgName),
    );

    expect(oriImage).toBeTruthy();

    loadImage(imgName, width, height)
      .then((fileBuffer) => {
        expect(fileBuffer).toBeTruthy();
        expect(fileBuffer.length).toBeLessThan(oriImage.length);
        const resizedPath = path.join(
          __dirname,
          '..',
          '..',
          'images',
          'resized',
          `${width}_${height}_${imgName}`,
        );
        const resizedImage = readFileSync(resizedPath);
        expect(resizedImage).toBeTruthy();
        unlinkSync(resizedPath);
      })
      .catch(() => {
        expect(true).toBeFalse();
      });
  });
});
