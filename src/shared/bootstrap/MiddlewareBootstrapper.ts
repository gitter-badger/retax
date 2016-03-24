import { inject } from 'inversify';

import { IBootstrapper, IMiddleware } from './interfaces';

import { IOptionReader, IMiddlewareOptions } from '../optionsReaders';

@inject('MiddlewareOptionReader')
export default class MiddlewareBootstrapper implements IBootstrapper<IMiddlewareOptions, void, IMiddleware> {
  constructor(
    private _optionsReader: IOptionReader<IMiddlewareOptions>
  ) {}

  public config(options: IMiddlewareOptions): void {
    this._optionsReader.read(options);
  }

  public bootstrap(): IMiddleware {
    return (req, res, next) => {
      console.log('here');
      next();
    };
  }
}
