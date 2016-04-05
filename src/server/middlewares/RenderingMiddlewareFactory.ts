import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigProxy, SERVER_CONFIG_PROXY } from '../configProxy';
import {
  IRequestBootstrapper, REQUEST_BOOTSTRAPPER,
  IKernelFactory, KERNEL_FACTORY,
  retaxServerModule,
} from '../../core';

@injectable()
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_PROXY) private _configProxy: IServerConfigProxy,
    @inject(KERNEL_FACTORY) private _kernelFactory: IKernelFactory
  ) {}

  public create(): IRetaxMiddleware {
    const { retaxConfig, isomorphicTools } = this._configProxy.config;

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const kernel = this._kernelFactory.create([
          retaxServerModule,
        ]);
        const requestBootstrapper = kernel.get<IRequestBootstrapper>(REQUEST_BOOTSTRAPPER);

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
