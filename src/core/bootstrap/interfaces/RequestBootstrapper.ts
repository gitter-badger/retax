import { Request } from 'express';

import { IBootstrapper } from '../../../utils';
import { IRetaxConfig } from '../../configStores';
import { IInversifyKernelFacade } from '../../inversifyKernelFacade';

export interface IAssets {
  javascript: Object;
  styles: Object;
}

export interface IIsomorphicTools {
  assets(): IAssets;
  development(inDevelopment: boolean): IIsomorphicTools;
}

export interface IRequestBootstrapConfig {
  req: Request;
  isomorphicTools: IIsomorphicTools;
  kernel: IInversifyKernelFacade;
}

export interface IRequestBootstrapper extends IBootstrapper<
  IRetaxConfig,
  IRequestBootstrapConfig,
  Promise<string>
> {}
