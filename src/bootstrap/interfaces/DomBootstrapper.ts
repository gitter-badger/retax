import { IBootstrapper } from './Bootstrapper';
import { IRetaxConfig } from '../../config';

export interface IDomBootstrapper extends IBootstrapper<IRetaxConfig, Element, Promise<void>> {}
