import { IRetaxConfig } from './retaxConfig';

export interface IMiddlewareConfig {
  serverRendering?: boolean;
  isomorphicTools?: any;
  retaxConfig?: IRetaxConfig;
}
