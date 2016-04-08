import { IServerConfig } from '../../configStores';
import { IConfigProxy } from '../../../utils';

export interface IServerConfigProxy extends IConfigProxy<IServerConfig> {
  evaluateConfig(): IServerConfig;
}
