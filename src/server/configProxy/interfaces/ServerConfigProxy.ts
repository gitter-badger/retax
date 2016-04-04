import { IServerConfig } from '../../config';
import { IConfigProxy } from '../../../core';

export interface IServerConfigProxy extends IConfigProxy<IServerConfig> {
  evaluateConfig(): IServerConfig;
}
