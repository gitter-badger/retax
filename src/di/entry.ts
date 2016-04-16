import 'reflect-metadata';
import { Kernel } from 'inversify';

import { diModule } from './inversify';

const kernel = new Kernel();

kernel.load(diModule);

export default kernel;
