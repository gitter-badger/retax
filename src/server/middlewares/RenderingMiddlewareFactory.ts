import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigProxy, ServerConfigProxy } from '../configProxy';
import { IRequestBootstrapper, internalModule, retaxModule, requestModule, RequestBootstrapper } from '../../retax';
import { IKernelFactory, KernelFactory } from '../../kernel';

@injectable(ServerConfigProxy, KernelFactory)
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    private _configProxy: IServerConfigProxy,
    private _kernelFactory: IKernelFactory
  ) {}

  public create(): IRetaxMiddleware {
    const { retaxConfig, isomorphicTools } = this._configProxy.config;

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const kernel = this._kernelFactory.create([
          internalModule, retaxModule, requestModule,
        ]);
        const requestBootstrapper = kernel.get<IRequestBootstrapper>(RequestBootstrapper);

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
