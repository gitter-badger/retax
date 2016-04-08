import { injectable, inject } from 'inversify';

import { IServerBootstrapper } from './interfaces';

import { IServerConfigProxy } from '../configProxy';
import { IServerConfig } from '../configStores';
import { IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middlewares';

import {
  SERVER_CONFIG_PROXY,
  MIDDLEWARES,
} from '../inversify';

@injectable()
export default class ServerBootstrapper implements IServerBootstrapper {
  constructor(
    @inject(SERVER_CONFIG_PROXY) private _configProxy: IServerConfigProxy,
    @inject(MIDDLEWARES.STATIC_MIDDLEWARE_FACTORY) private _staticMiddlewareFactory: IRetaxMiddlewareFactory,
    @inject(MIDDLEWARES.RENDERING_MIDDLEWARE_FACTORY) private _renderingMiddlewareFactory: IRetaxMiddlewareFactory
  ) {}

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
