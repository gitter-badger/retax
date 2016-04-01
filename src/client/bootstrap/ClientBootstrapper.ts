import { injectable } from 'inversify';

import { ABootstrapper } from '../../utils/bootstrap';

import {
  internalModule, domModule, retaxModule,
  IRetaxConfig, IDomBootstrapper, DomBootstrapper,
} from '../../retax';
import { IKernelFactory, KernelFactory } from '../../kernel';

@injectable(KernelFactory)
export default class ClientBootstrapper extends ABootstrapper<IRetaxConfig, Element, Promise<void>> {
  private _retaxConfig: IRetaxConfig;

  constructor(
    private _kernelFactory: IKernelFactory
  ) {
    super();
  }

  public config(config: IRetaxConfig): void {
    this._retaxConfig = config;
  }

  public bootstrap(element: Element): Promise<void> {
    const kernel = this._kernelFactory.create([
      internalModule, domModule, retaxModule,
    ]);
    const bootstrapper = kernel.get<IDomBootstrapper>(DomBootstrapper);

    bootstrapper.config(this._retaxConfig);

    return bootstrapper.bootstrap({
      kernel,
      element,
    });
  }
}