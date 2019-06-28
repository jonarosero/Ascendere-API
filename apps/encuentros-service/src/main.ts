import { encuentrosRouter } from './app/encuentros-crud.routes';
import { montlyEncuentrosRouter } from './app/encuentros-extras.routes';
import { inscripcionEncuentroRouter } from './app/inscripcion-encuentro.routes';

import {
  IndevExpressServer,
  IndevDatabase
} from '@ascendere/indev-express-server';

const server = new IndevExpressServer({
  PORT: Number(process.env.PORT) || 3000,
  DATABASE: IndevDatabase.mongoDB,
  DB_URI: 'mongodb://localhost:27017/ascendere',
  USE_BODYPARSER: true
});

server.app.use('/encuentros-service', [
  encuentrosRouter,
  montlyEncuentrosRouter,
  inscripcionEncuentroRouter
]);

server.listen();
