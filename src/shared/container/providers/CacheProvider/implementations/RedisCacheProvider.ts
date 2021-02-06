import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    return JSON.parse(data);
  }

  public async invalidate(key: string): Promise<void> {
    const keys = await this.client.keys(`*${key}*`);

    const pipeline = this.client.pipeline();

    keys.forEach(async key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
