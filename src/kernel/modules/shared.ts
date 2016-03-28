import { IKernel } from 'inversify';

import { IInternalConfig, internalConfig } from '../../config';
import { IConfigStore, createConfigStore } from '../../utils';

export default function shared(kernel: IKernel): void {
  kernel.bind<IConfigStore<IInternalConfig>>('InternalConfigStore').toValue(createConfigStore(internalConfig));
}
