import { IKernel } from 'inversify';

import { AbstractApi } from '../api';

export default function apiModule(kernel: IKernel): void {
  kernel.bind<typeof AbstractApi>('AbstractApiConstructor').toValue(AbstractApi);
}
