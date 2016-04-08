import { IServerConfig, IServerConfigStore } from './interfaces';
import { retaxConfig } from '../../core';

import { createConfigStore } from '../../utils';


export const serverConfig: IServerConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

const serverConfigStore: IServerConfigStore = createConfigStore<IServerConfig>(serverConfig);

export default serverConfigStore;
