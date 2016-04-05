import { injectable, inject } from 'inversify';

import { ABootstrapper } from '../../utils';

import { IServerConfigProxy, SERVER_CONFIG_PROXY } from '../configProxy';
import { IServerConfig } from '../config';
import { IRetaxMiddlewareFactory, IRetaxMiddleware, MIDDLEWARES } from '../middlewares';

@injectable()
export default class ServerBootstrapper extends ABootstrapper<IServerConfig, void, IRetaxMiddleware> {
  constructor(
    @inject(SERVER_CONFIG_PROXY) private _configProxy: IServerConfigProxy,
    @inject(MIDDLEWARES.STATIC_MIDDLEWARE_FACTORY) private _staticMiddlewareFactory: IRetaxMiddlewareFactory,
    @inject(MIDDLEWARES.RENDERING_MIDDLEWARE_FACTORY) private _renderingMiddlewareFactory: IRetaxMiddlewareFactory
  ) {
    super();
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
