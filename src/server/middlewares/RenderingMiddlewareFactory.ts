import { injectable, inject } from 'inversify';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigStore } from '../configStores';
import {
  serverModule, contextModuleFactory,
  IJSXBuilder, JSX_BUILDER,
} from '../../core';
import { IKernelMediator, KERNEL_MEDIATOR } from '../../di';

import { SERVER_CONFIG_STORE } from '../inversify';

@injectable()
export default class RenderingMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_STORE) private _configStore: IServerConfigStore,
    @inject(KERNEL_MEDIATOR) private _kernelMediator: IKernelMediator
  ) {}

  public create(): IRetaxMiddleware {
    const { retaxConfig, isomorphicTools } = this._configStore.config;

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // configure history
        const history = createMemoryHistory();
        const location = history.createLocation(req.originalUrl);
        history.replace(location);

        // create IOC kernel
        const kernel = this._kernelMediator.create([
          serverModule,
          contextModuleFactory({ history, retaxConfig, request: { req, res, isomorphicTools } }),
        ]);

        // builder the app
        const builder = kernel.getService<IJSXBuilder>(JSX_BUILDER);
        const app = await builder.build(kernel);

        // render!
        const markup = renderToString(app);

        res.send(markup);
      } catch (e) {
        next(e);
      }
    };
  }
}
