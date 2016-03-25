export interface IConfigProxy<T> {
  config: T;
  evaluateConfig(...args: any[]): T;
}
