import { inject } from 'inversify';

import { IMiddlewareBoostrapper } from './interfaces';

import { IMiddlewareConfigProxy } from '../configProxies';
import { IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middlewares';
import { IMiddlewareConfig } from '../config';

@inject('MiddlewareConfigProxy', 'RetaxMiddlewareFactory[]')
export default class MiddlewareBootstrapper implements IMiddlewareBoostrapper {
  private _staticMiddlewareFactory: IRetaxMiddlewareFactory;
  private _renderingMiddlewareFactory: IRetaxMiddlewareFactory;

  constructor(
    private _middlewareConfigProxy: IMiddlewareConfigProxy,
    private _retaxMiddlewareFactories: IRetaxMiddlewareFactory[]
  ) {
    this._staticMiddlewareFactory = _retaxMiddlewareFactories[0];
    this._renderingMiddlewareFactory = _retaxMiddlewareFactories[1];
  }

  public config(config: IMiddlewareConfig): void {
    this._middlewareConfigProxy.config = config;
  }

  public bootstrap(): IRetaxMiddleware {
    const { config } = this._middlewareConfigProxy;

    if (config.serverRendering) {
      return this._renderingMiddlewareFactory.create();
    } else {
      return this._staticMiddlewareFactory.create();
    }
  }
}
