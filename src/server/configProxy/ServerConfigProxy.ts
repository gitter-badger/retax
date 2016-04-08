import { injectable, inject } from 'inversify';

import { IServerConfig, IServerConfigStore } from '../configStores';
import { AConfigProxy } from '../../utils';

import { SERVER_CONFIG_STORE } from '../inversify';

@injectable()
export default class ServerConfigProxy extends AConfigProxy<IServerConfig> {
  constructor(
    @inject(SERVER_CONFIG_STORE) config: IServerConfigStore
  ) {
    super(config);
  }

  public evaluateConfig(): IServerConfig {
    return super.config;
  }
}
