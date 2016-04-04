import { IServerConfig } from './interfaces';
import { retaxConfig } from '../../core';

const serverConfig: IServerConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

export default serverConfig;
