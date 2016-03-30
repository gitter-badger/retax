import { IKernel } from 'inversify';

import { IClientBootstrapper, ClientBootstrapper } from '../bootstrap';

export default function clientModule(kernel: IKernel): void {
  kernel.bind<IClientBootstrapper>('ClientBootstrapper').to(ClientBootstrapper).inSingletonScope();
}
