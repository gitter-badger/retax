import 'reflect-metadata';
import kernel from './kernel';

import { IDomBootstrapper } from '../bootstrap';

const retaxBootstrapper = kernel.get<IDomBootstrapper>('Bootstrapper');

export default retaxBootstrapper;
