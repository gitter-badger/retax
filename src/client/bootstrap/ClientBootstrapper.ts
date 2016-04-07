import { injectable, inject, IKernel } from 'inversify';

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
  private _kernel: IKernel;

  constructor(
    @inject(KERNEL_FACTORY) private _kernelFactory: IKernelFactory
  ) {
    super();
  }

  public config(config: IRetaxConfig): void {
    this._retaxConfig = config;
  }

  public bootstrap(element: Element): Promise<void> {
    this._kernel = this._kernelFactory.create([
      retaxClientModule,
    ]);
    const bootstrapper = this._kernel.get<IDomBootstrapper>(DOM_BOOTSTRAPPER);

    bootstrapper.config(this._retaxConfig);

    return bootstrapper.bootstrap({
      kernel: this._kernel,
      element,
    });
  }

  public updateKernel(): void {
    // do something with this._kernel and maybe injector to reload new user modules
  }
}
