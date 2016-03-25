import { IBootstrapper } from './Bootstrapper';
import { IRetaxOptions } from '../../optionsReaders';

export interface IDomBootstrapper extends IBootstrapper<IRetaxOptions, Element, Promise<void>> {}
