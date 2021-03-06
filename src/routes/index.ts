import express, { Request, Response } from 'express';
import loadImage from '../services/images/load.images';

const routes = express.Router();
routes.get('/images', async (req: Request, resp: Response): Promise<void> => {
  const fileName = req.query.fileName;
  const height = req.query.height;
  const width = req.query.width;
  if (!fileName) {
    resp.status(400);
    resp.contentType('application/json');
    resp.send({
      message: "The query parameter 'fileName' is mandatory.",
      code: 400,
    });
  }

  try {
    const imgBuffer = await loadImage(
      fileName as string,
      !!width ? parseInt(width as string) : undefined,
      !!height ? parseInt(height as string) : undefined,
    );
    resp.contentType('image/jpg');
    resp.send(imgBuffer);
  } catch (e) {
    resp.status(404);
    resp.contentType('application/json');
    resp.send({
      message: (e as Error).message,
      code: 404,
    });
  }
});

export default routes;
