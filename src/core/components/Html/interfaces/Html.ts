import { IAssets } from '../../../context';

export interface IHtmlProps {
  store: Redux.Store;
  assets: IAssets;
  rootComponent: JSX.Element;
}