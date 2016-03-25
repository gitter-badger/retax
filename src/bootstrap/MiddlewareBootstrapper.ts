import { inject } from 'inversify';

import { IBootstrapper } from './interfaces';

import { IOptionReader, IMiddlewareOptions } from '../optionsReaders';
import { IRetaxMiddlewareFactory, IRetaxMiddleware } from '../middleware';

@inject('MiddlewareOptionReader', 'RetaxMiddlewareFactory[]')
export default class MiddlewareBootstrapper implements IBootstrapper<IMiddlewareOptions, void, IRetaxMiddleware> {
  private _staticMiddlewareFactory: IRetaxMiddlewareFactory;
  private _renderingMiddlewareFactory: IRetaxMiddlewareFactory;

  constructor(
    private _optionsReader: IOptionReader<IMiddlewareOptions>,
    private _retaxMiddlewareFactories: IRetaxMiddlewareFactory[]
  ) {
    this._staticMiddlewareFactory = _retaxMiddlewareFactories[0];
    this._renderingMiddlewareFactory = _retaxMiddlewareFactories[1];
  }

  public config(options: IMiddlewareOptions): void {
    this._optionsReader.read(options);
  }

  public bootstrap(): IRetaxMiddleware {
    if (this._optionsReader.config.serverRendering) {
      return this._renderingMiddlewareFactory.create();
    } else {
      return this._staticMiddlewareFactory.create();
    }
  }
}
