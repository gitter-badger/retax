import { inject } from 'inversify';

import { IMiddlewareBoostrapper } from './interfaces';

import { IMiddlewareConfigProxy } from '../configProxies';
import { IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middleware';
import { IMiddlewareConfig } from '../config';

@inject('MiddlewareConfigProxy', 'RetaxMiddlewareFactory[]')
export default class MiddlewareBootstrapper implements IMiddlewareBoostrapper {
  private _staticMiddlewareFactory: IRetaxMiddlewareFactory;
  private _renderingMiddlewareFactory: IRetaxMiddlewareFactory;

  constructor(
    private _configProxy: IMiddlewareConfigProxy,
    private _retaxMiddlewareFactories: IRetaxMiddlewareFactory[]
  ) {
    this._staticMiddlewareFactory = _retaxMiddlewareFactories[0];
    this._renderingMiddlewareFactory = _retaxMiddlewareFactories[1];
  }

  public config(config: IMiddlewareConfig): void {
    this._configProxy.config = config;
  }

  public bootstrap(): IRetaxMiddleware {
    if (this._configProxy.config.serverRendering) {
      return this._renderingMiddlewareFactory.create();
    } else {
      return this._staticMiddlewareFactory.create();
    }
  }
}
