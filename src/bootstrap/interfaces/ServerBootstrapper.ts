import { IBootstrapper } from './Bootstrapper';
import { IRetaxConfig } from '../../config';

export interface IServerBootstrapper extends IBootstrapper<IRetaxConfig, void, string> {}
