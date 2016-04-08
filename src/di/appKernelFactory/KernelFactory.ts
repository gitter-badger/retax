import { injectable, inject, IKernelModule, IFactory } from 'inversify';

import { IKernelFactory } from './interfaces';

import { IInjector } from '../injector';
import { IInversifyKernelFacade } from '../../core';

import { INJECTOR, INVERSIFY_KERNEL_FACADE_FACTORY } from '../inversify';

@injectable()
export default class KernelFactory implements IKernelFactory {
  constructor(
    @inject(INJECTOR) private _injector: IInjector,
    @inject(INVERSIFY_KERNEL_FACADE_FACTORY) private _kernelFactory: IFactory<IInversifyKernelFacade>
  ) {}

  /**
   * Create a new IoC container.
   * All user registered module will be included
   */
  public create(modules: IKernelModule[]): IInversifyKernelFacade {
    const userModules = this._injector.userModules;

    const kernelFacade = this._kernelFactory();

    kernelFacade.loadKernelModules(modules);
    kernelFacade.loadModules(userModules);

    return kernelFacade;
  }
}
