import 'module-alias/register';
import express, { Application } from 'express';
import http, { Server } from 'http';
import { config } from '$/config';
import { Router } from '$/router';

export class App {
  public app: Application;
  public http: Server;

  constructor() {
    this.app = express();
  }

  public async start(): Promise<void> {
    // TODO: initialize server, e.g, services, database, etc.
    console.log('Config is: ', config);

    try {
      await new Router({ app: this.app });
      await this.listen();
    } catch (err) {
      console.error('Error: %o', err);
    }
  }

  private async listen(): Promise<void> {
    this.http = http
      .createServer(this.app)
      .listen(config.app.port, () =>
        console.info(`Serving on http://localhost:${config.app.port}`),
      )
      .on('error', err => {
        console.error(err);
        process.exit(1);
      });
  }
}

export default new App().start();
