export interface IOptionReader<T extends Object> {
  config: T;
  read(options: T): T;
}
