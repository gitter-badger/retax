import { injectable, inject } from 'inversify';

import { IServerConfig, SERVER_CONFIG_STORE } from '../config';
import { AConfigProxy, IConfigStore } from '../../utils';

@injectable()
export default class ServerConfigProxy extends AConfigProxy<IServerConfig> {
  constructor(
    @inject(SERVER_CONFIG_STORE) config: IConfigStore<IServerConfig>
  ) {
    super(config);
  }

  public evaluateConfig(): IServerConfig {
    return super.config;
  }
}
