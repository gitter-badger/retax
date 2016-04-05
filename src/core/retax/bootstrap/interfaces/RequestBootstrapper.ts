import { IKernel } from 'inversify';
import { Request } from 'express';

import { IBootstrapper } from '../../../../utils';
import { IRetaxConfig } from '../../config';

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
  kernel: IKernel;
}

export interface IRequestBootstrapper extends IBootstrapper<
  IRetaxConfig,
  IRequestBootstrapConfig,
  Promise<string>
> {}
