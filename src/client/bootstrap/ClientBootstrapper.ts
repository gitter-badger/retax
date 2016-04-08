import { injectable, inject } from 'inversify';

import { IClientBootstrapper } from './interfaces';

import {
  IKernelFactory, KERNEL_FACTORY,
  IInjector, INJECTOR,
} from '../../di';
import {
  clientModule,
  IInversifyKernelFacade,
  IRetaxConfig,
  DOM_BOOTSTRAPPER, IDomBootstrapper,
} from '../../core';

@injectable()
export default class ClientBootstrapper implements IClientBootstrapper {
  private _retaxConfig: IRetaxConfig;
  private _kernelFacade: IInversifyKernelFacade;

  constructor(
    @inject(KERNEL_FACTORY) private _kernelFactory: IKernelFactory,
    @inject(INJECTOR) private _injector: IInjector
  ) {}

  public config(config: IRetaxConfig): void {
    this._retaxConfig = config;
  }

  public bootstrap(element: Element): Promise<void> {
    this._kernelFacade = this._kernelFactory.create([
      clientModule,
    ]);
    const bootstrapper = this._kernelFacade.getService<IDomBootstrapper>(DOM_BOOTSTRAPPER);

    bootstrapper.config(this._retaxConfig);

    return bootstrapper.bootstrap({
      kernel: this._kernelFacade,
      element,
    });
  }

  public reload(): void {
    if (this._kernelFacade) {
      const userModules = this._injector.userModules;

      this._kernelFacade.loadModules(userModules);
    }
  }
}
