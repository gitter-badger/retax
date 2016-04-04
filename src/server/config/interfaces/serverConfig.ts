import { IRetaxConfig, IIsomorphicTools } from '../../../core';

export interface IServerConfig {
  serverRendering?: boolean;
  isomorphicTools?: IIsomorphicTools;
  retaxConfig?: IRetaxConfig;
}
