import 'module-alias/register';
import express, { Application } from 'express';
import { Server } from 'http';
import { config } from '$/config';

export class App {
  public app: Application;
  public http: Server;

  constructor() {
    this.app = express();
  }

  public static start(): void {
    // TODO: initialize server, e.g, services, database, etc.
    console.log('Config is: ', config);
  }

  private async listen(): Promise<void> {
    // TODO: Start Express server
  }
}

App.start();
