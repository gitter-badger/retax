import { IKernel } from 'inversify';

import { AActionsCreator } from '../abstractActionsCreator';

export default function actionsCreatorModule(kernel: IKernel): void {
  kernel.bind<typeof AActionsCreator>('AbstractActionsCreatorConstructor').toValue(AActionsCreator);
}
