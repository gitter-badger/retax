import ConfigStore from './ConfigStore';
import { IConfigStore } from './interfaces';

export default function createConfigStore<T>(config: T): IConfigStore<T> {
  return new ConfigStore<T>(config);
}
