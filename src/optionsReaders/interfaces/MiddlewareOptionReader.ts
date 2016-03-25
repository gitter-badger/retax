import { IRetaxOptions } from './RetaxOptionReader';

export interface IMiddlewareOptions {
  serverRendering?: boolean;
  isomorphicTools?: any;
  retaxOptions?: IRetaxOptions;
}
