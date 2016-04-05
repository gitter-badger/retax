import { IServerConfig } from '../../config';
import { IConfigProxy } from '../../../utils';

export interface IServerConfigProxy extends IConfigProxy<IServerConfig> {
  evaluateConfig(): IServerConfig;
}
