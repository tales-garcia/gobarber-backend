import ICacheProvider from "../models/ICacheProvider";

export default class CacheProviderMock implements ICacheProvider {
  private data = {};

  async save(key: string, value: any) {
    this.data[key] = value;
  }
  async recover<T = any>(key: string) {
    return this.data[key] as T;
  }
  async invalidate(key: string) {
    delete this.data[key];
  }
  async invalidateMatching(pattern: string) {
    const keys = Object.keys(this.data);

    keys.filter(key => key.match(pattern));

    keys.forEach(this.invalidate);
  }

}
