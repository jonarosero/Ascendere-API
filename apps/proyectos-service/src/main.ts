import {
  IndevExpressServer,
  IndevDatabase
} from '@ascendere/indev-express-server';

const server = new IndevExpressServer({
  PORT: Number(process.env.PORT) || 3333,
  DATABASE: IndevDatabase.mongoDB,
  DB_URI: 'mongodb://localhost:27017/ascendere',
  USE_BODYPARSER: true
});

// server.app.use('/proyectos-service', []);

server.listen();
