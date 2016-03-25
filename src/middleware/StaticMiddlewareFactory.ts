import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

export default class StaticMiddlewareFactory implements IRetaxMiddlewareFactory {
  public create(): IRetaxMiddleware {
    return function retaxMiddleware(req: Request, res: Response, next: NextFunction) {
      res.sendStatus(500);
    };
  }
}
