import 'reflect-metadata';
import kernel from './kernel';

import { IBootstrapper } from '../bootstrap';
import { IRetaxOptions } from '../optionsReaders';

const retaxBootstrapper = kernel.get<IBootstrapper<IRetaxOptions, Element, Promise<void>>>('Bootstrapper');

export default retaxBootstrapper;
