import { IBootstrapper } from './Bootstrapper';
import { IRetaxOptions } from '../../optionsReaders';

export interface IServerBootstrapper extends IBootstrapper<IRetaxOptions, void, string> {}
