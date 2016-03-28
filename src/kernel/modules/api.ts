import { IKernel } from 'inversify';

import {
  AApi,
} from '../../api';

export default function api(kernel: IKernel): void {
  kernel.bind<typeof AApi>('AApi').toValue(AApi);
}
