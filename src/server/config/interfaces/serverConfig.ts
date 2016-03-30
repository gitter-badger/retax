import { IRetaxConfig, IIsomorphicTools } from '../../../retax';

export interface IServerConfig {
  serverRendering?: boolean;
  isomorphicTools?: IIsomorphicTools;
  retaxConfig?: IRetaxConfig;
}
