import * as express from 'express';
import * as mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import * as bodyParser from 'body-parser';

import { IndevDatabase } from './indev-database';

/**
 * TODO: add docs
 */
export interface IndevExpressServerOptions {
  PORT: number;
  DATABASE: IndevDatabase;
  DB_URI: string;
  USE_BODYPARSER: Boolean;
}

export class IndevExpressServer {
  public app: express.Application;

  /**
   * Create new Express server, and define some middleware
   */
  constructor(private options: IndevExpressServerOptions) {
    this.app = express();

    if (this.options.USE_BODYPARSER) {
      // bodyParser use
      this.app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );

      this.app.use(bodyParser.json());
    }
  }

  listen() {
    this.app.listen(this.options.PORT, () => {
      console.log(
        `
        ---Express server listening on port ${this.options.PORT}---
        url: http://localhost:${this.options.PORT}
        `
      );
    });

    this.connectToMongo();
  }

  private connectToMongo() {
    if (this.options.DATABASE === IndevDatabase.mongoDB)
      mongoose.connect(
        this.options.DB_URI,
        { useNewUrlParser: true },
        (err: MongoError) => {
          if (!!err) {
            throw Error(
              'Error while connecting to mongodb. Mongo not connected.'
            );
          }
        }
      );
  }
}
