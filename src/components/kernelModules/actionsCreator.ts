import { IKernel } from 'inversify';

import { AbstractActionsCreator } from '../actionsCreator';

export default function actionsCreatorModule(kernel: IKernel): void {
  kernel.bind<typeof AbstractActionsCreator>('AbstractActionsCreatorConstructor').toValue(AbstractActionsCreator);
}
