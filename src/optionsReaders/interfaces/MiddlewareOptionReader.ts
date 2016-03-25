import { IOptionReader } from './OptionReader';
import { IRetaxOptions } from './RetaxOptionReader';

export interface IMiddlewareOptions {
  serverRendering?: boolean;
  isomorphicTools?: any;
  retaxOptions?: IRetaxOptions;
}

export interface IMiddlewareOptionReader extends IOptionReader<IMiddlewareOptions> {}
