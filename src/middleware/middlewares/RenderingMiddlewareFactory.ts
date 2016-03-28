import { inject, IKernel } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IMiddlewareConfigProxy } from '../configProxy';
import { IServerBootstrapper } from '../../retax';

@inject('Kernel', 'MiddlewareConfigProxy')
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    private _kernel: IKernel,
    private _configProxy: IMiddlewareConfigProxy
  ) {}

  public create(): IRetaxMiddleware {
    const { retaxConfig, isomorphicTools } = this._configProxy.config;

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const serverBootstrapper = this._kernel.get<IServerBootstrapper>('ServerBootstrapper');

        serverBootstrapper.config(retaxConfig);

        const markup = await serverBootstrapper.bootstrap({
          req,
          isomorphicTools,
        });

        res.send(markup);
      } catch (e) {
        next(e);
      }
    };
  }
}
