import { IKernel } from 'inversify';

import { AApi } from '../abstractApi';

export default function apiModule(kernel: IKernel): void {
  kernel.bind<typeof AApi>('AbstractApiConstructor').toValue(AApi);
}
