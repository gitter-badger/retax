import { injectable } from 'inversify';

import { ABootstrapper } from '../../utils/bootstrap';

import { IServerConfigProxy, ServerConfigProxy } from '../configProxy';
import { IServerConfig } from '../config';
import { IRetaxMiddlewareFactory, IRetaxMiddleware, StaticMiddlewareFactory, RenderingMiddlewareFactory } from '../middlewares';

@injectable(ServerConfigProxy, StaticMiddlewareFactory, RenderingMiddlewareFactory)
export default class ServerBootstrapper extends ABootstrapper<IServerConfig, void, IRetaxMiddleware> {
  constructor(
    private _configProxy: IServerConfigProxy,
    private _staticMiddlewareFactory: IRetaxMiddlewareFactory,
    private _renderingMiddlewareFactory: IRetaxMiddlewareFactory
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
