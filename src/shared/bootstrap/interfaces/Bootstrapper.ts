import { IRetaxOptions } from '../../optionsReaders/retax';

export interface IBootstrapper {
  config(options: IRetaxOptions): void;
  bootstrap(): Promise<void>;
}
