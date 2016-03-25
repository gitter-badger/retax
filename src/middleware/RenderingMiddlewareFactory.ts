import { inject, IKernel } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';
import { IServerBootstrapper } from '../bootstrap';

@inject('Kernel')
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    private _kernel: IKernel
  ) {}

  public create(): IRetaxMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {

      const serverBootstrapper = this._kernel.get<IServerBootstrapper>('ServerBootstrapper');

      console.log(serverBootstrapper);

      res.sendStatus(404);
    };
  }
}
