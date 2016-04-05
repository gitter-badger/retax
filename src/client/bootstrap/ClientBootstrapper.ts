import { injectable, inject } from 'inversify';

import { ABootstrapper } from '../../utils';

import {
  IKernelFactory, KERNEL_FACTORY,
  retaxClientModule,
  IRetaxConfig,
  DOM_BOOTSTRAPPER, IDomBootstrapper,
} from '../../core';

@injectable()
export default class ClientBootstrapper extends ABootstrapper<IRetaxConfig, Element, Promise<void>> {
  private _retaxConfig: IRetaxConfig;

  constructor(
    @inject(KERNEL_FACTORY) private _kernelFactory: IKernelFactory
  ) {
    super();
  }

  public config(config: IRetaxConfig): void {
    this._retaxConfig = config;
  }

  public bootstrap(element: Element): Promise<void> {
    const kernel = this._kernelFactory.create([
      retaxClientModule,
    ]);
    const bootstrapper = kernel.get<IDomBootstrapper>(DOM_BOOTSTRAPPER);

    bootstrapper.config(this._retaxConfig);

    return bootstrapper.bootstrap({
      kernel,
      element,
    });
  }
}
