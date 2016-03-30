import { inject } from 'inversify';

import { ABootstrapper } from '../../utils/bootstrap';

import { IServerConfigProxy } from '../configProxy';
import { IServerConfig } from '../config';
import { IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middlewares';

@inject('ServerConfigProxy', 'RetaxMiddlewareFactory[]')
export default class ServerBootstrapper extends ABootstrapper<IServerConfig, void, IRetaxMiddleware> {
  private _staticMiddlewareFactory: IRetaxMiddlewareFactory;
  private _renderingMiddlewareFactory: IRetaxMiddlewareFactory;

  constructor(
    private _configProxy: IServerConfigProxy,
    private _retaxMiddlewareFactories: IRetaxMiddlewareFactory[]
  ) {
    super();
    this._staticMiddlewareFactory = _retaxMiddlewareFactories[0];
    this._renderingMiddlewareFactory = _retaxMiddlewareFactories[1];
  }

  public config(config: IServerConfig): void {
    this._configProxy.config = config;
  }

  public bootstrap(): IRetaxMiddleware {
    const { config } = this._configProxy;

    if (config.serverRendering) {
      return this._renderingMiddlewareFactory.create();
    } else {
      return this._staticMiddlewareFactory.create();
    }
  }
}
