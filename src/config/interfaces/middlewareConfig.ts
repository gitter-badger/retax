import { IRetaxConfig } from './retaxConfig';

export interface IAssets {
  javascript: Object;
  styles: Object;
}

export interface IIsomorphicTools {
  assets(): IAssets;
  development(b: boolean): IIsomorphicTools;
}

export interface IMiddlewareConfig {
  serverRendering?: boolean;
  isomorphicTools?: IIsomorphicTools;
  retaxConfig?: IRetaxConfig;
}
