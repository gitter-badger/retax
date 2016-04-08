import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigProxy } from '../configProxy';
import {
  serverModule,
  IRequestBootstrapper, REQUEST_BOOTSTRAPPER,
} from '../../core';
import { IKernelMediator, KERNEL_MEDIATOR } from '../../di';

import { SERVER_CONFIG_PROXY } from '../inversify';

@injectable()
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_PROXY) private _configProxy: IServerConfigProxy,
    @inject(KERNEL_MEDIATOR) private _kernelMediator: IKernelMediator
  ) {}

  public create(): IRetaxMiddleware {
    const { retaxConfig, isomorphicTools } = this._configProxy.config;

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const kernel = this._kernelMediator.create([
          serverModule,
        ]);
        const requestBootstrapper = kernel.getService<IRequestBootstrapper>(REQUEST_BOOTSTRAPPER);

        requestBootstrapper.config(retaxConfig);

        const markup = await requestBootstrapper.bootstrap({
          kernel,
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
