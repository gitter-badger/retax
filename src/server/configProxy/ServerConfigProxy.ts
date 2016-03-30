import { inject } from 'inversify';

import { IServerConfig } from '../config';
import { AConfigProxy } from '../../utils/configProxy';

@inject('ServerConfigStore')
export default class ServerConfigProxy extends AConfigProxy<IServerConfig> {
  public evaluateConfig(): IServerConfig {
    return super.config;
  }
}
