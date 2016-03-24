import 'reflect-metadata';
import kernel from './kernel';

import { IBootstrapper } from '../shared/bootstrap';
import { IRetaxOptions } from '../shared/optionsReaders';

export default kernel.get<IBootstrapper<IRetaxOptions, Element, Promise<void>>>('Bootstrapper');
