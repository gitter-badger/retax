import { injectable } from 'inversify';

import { IServerConfig } from './interfaces';

import { ConfigStore } from '../../utils';

import { retaxConfig } from '../../core';


export const initialConfig: IServerConfig = {
  isomorphicTools: undefined,
  retaxConfig,
  serverRendering: true,
};

@injectable()
export default class ServerConfigStore extends ConfigStore<IServerConfig> {
  constructor() {
    super();
    this.config = initialConfig;
  }
}
