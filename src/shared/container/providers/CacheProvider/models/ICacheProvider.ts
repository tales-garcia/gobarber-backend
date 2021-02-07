export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T = any>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidateMatching(pattern: string): Promise<void>;
}
