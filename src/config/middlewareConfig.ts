import { IMiddlewareConfig } from './interfaces';
import retaxConfig from './retaxConfig';

const middlewareConfig: IMiddlewareConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

export default middlewareConfig;
