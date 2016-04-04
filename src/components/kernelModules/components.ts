import { IKernel } from 'inversify';

import apiModule from './api';
import actionsCreatorModule from './actionsCreator';

export default function componentsModule(kernel: IKernel): void {
  kernel.load(apiModule);
  kernel.load(actionsCreatorModule);
}
