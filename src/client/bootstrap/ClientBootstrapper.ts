import { injectable, inject } from 'inversify';

import { IClientBootstrapper } from './interfaces';

import {
  IKernelMediator, KERNEL_MEDIATOR,
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
    @inject(KERNEL_MEDIATOR) private _kernelMediator: IKernelMediator
  ) {}

  public config(config: IRetaxConfig): void {
    this._retaxConfig = config;
  }

  public bootstrap(element: Element): Promise<void> {
    this._kernelFacade = this._kernelMediator.create([
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
    this._kernelMediator.reload(this._kernelFacade);
  }
}
