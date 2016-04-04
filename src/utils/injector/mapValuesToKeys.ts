export function mapValuesToKeys<T>(keys: string[] = [], values: T[] = []): HashMap<T> {
  if (keys.length !== values.length) {
    throw new Error('Length Mismatch');
  }

  return values
    .map((V, i) => ({ key: keys[i], value: V }))
    .reduce((p, c) => ( Object.assign(p, { [c.key]: c.value })), {} as HashMap<T>);
}
