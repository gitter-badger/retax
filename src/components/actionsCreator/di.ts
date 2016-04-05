import { IKernel } from 'inversify';

import AbstractActionsCreator from './AbstractActionsCreator';

export const ABSTRACT_ACTIONS_CREATPOR = Symbol('AbstractActionsCreator');

export function abstractActionsCreatorModule(kernel: IKernel): void {
  kernel.bind<typeof AbstractActionsCreator>(ABSTRACT_ACTIONS_CREATPOR).toValue(AbstractActionsCreator);
}

