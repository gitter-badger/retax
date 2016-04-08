import {
  IActionsCreatorService,
} from '../../../di';

export interface IActionsCreator extends IActionsCreatorService {
  export(): IExportReturn;
}

export interface IExportReturn extends HashMap<Function> {}
