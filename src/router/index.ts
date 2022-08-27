import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { HttpCodes } from '$/utils/http-codes';

export class Router {
  private readonly app: Application;

  constructor(router: { app: Application }) {
    this.app = router.app;

    this.initializeSecurity();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeSecurity(): void {
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));

    // Use Morgan to log all requests to the console
    this.app.use(morgan('tiny'));
  }

  private initializeRoutes(): void {
    /**
     * Health check endpoint
     *
     * We register this endpoint separately,
     * because we want to avoid the versioning.
     */
    this.app.get('/health-check', (req: Request, res: Response) => {
      res.status(HttpCodes.OK).end();
    });

    this.app.head('/health-check', (req: Request, res: Response) => {
      res.status(HttpCodes.OK).end();
    });
  }
}
