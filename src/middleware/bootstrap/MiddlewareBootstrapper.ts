import { inject } from 'inversify';

import { ABootstrapper } from '../../utils/bootstrap';

import { IMiddlewareConfigProxy } from '../configProxy';
import { IMiddlewareConfig } from '../../config';
import { IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middlewares';

@inject('MiddlewareConfigProxy', 'RetaxMiddlewareFactory[]')
export default class MiddlewareBootstrapper extends ABootstrapper<IMiddlewareConfig, void, IRetaxMiddleware> {
  private _staticMiddlewareFactory: IRetaxMiddlewareFactory;
  private _renderingMiddlewareFactory: IRetaxMiddlewareFactory;

  constructor(
    private _middlewareConfigProxy: IMiddlewareConfigProxy,
    private _retaxMiddlewareFactories: IRetaxMiddlewareFactory[]
  ) {
    super();
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
