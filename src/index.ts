import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use('/api', routes);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default server;
