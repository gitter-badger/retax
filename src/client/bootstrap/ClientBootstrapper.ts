import { injectable, inject } from 'inversify';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

import { IClientBootstrapper } from './interfaces';

import {
  IKernelMediator, KERNEL_MEDIATOR, KernelMediator
} from '../../di';
import {
  clientModule, contextModuleFactory,
  IInversifyKernelFacade,
  IRetaxConfig,
  JSX_BUILDER, IJSXBuilder,
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

  public async bootstrap(element: Element): Promise<void> {
    // configure history
    const history = browserHistory;
    const location = history.createLocation(window.location);
    history.replace(location);

    // create IOC kernel
    this._kernelFacade = this._kernelMediator.create([
      clientModule,
      contextModuleFactory({ history, retaxConfig: this._retaxConfig }),
    ]);

    // build the app
    const builder = this._kernelFacade.getService<IJSXBuilder>(JSX_BUILDER);
    const app = await builder.build(this._kernelFacade);

    // render!
    render(app, element);
  }

  public reload(): void {
    this._kernelMediator.reload(this._kernelFacade);
  }
}
