import { IServerConfig } from './interfaces';
import { retaxConfig } from '../../retax';

const serverConfig: IServerConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

export default serverConfig;
