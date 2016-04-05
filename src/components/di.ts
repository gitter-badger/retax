import { IKernel } from 'inversify';

import { ABSTRACT_ACTIONS_CREATPOR, abstractActionsCreatorModule } from './actionsCreator';
import { ABSTRACT_API, abstractApiModule } from './api';

export const COMPONENTS = { ABSTRACT_ACTIONS_CREATPOR, ABSTRACT_API };

export function componentsModule(kernel: IKernel): void {
  kernel.load(abstractActionsCreatorModule);
  kernel.load(abstractApiModule);
}
