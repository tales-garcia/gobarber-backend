import { container } from "tsyringe";
import RedisCacheProvider from "./implementations/RedisCacheProvider";
import ICacheProvider from "./models/ICacheProvider";
import cacheConfig from '@config/cache';

const cacheProvider = {
  redis: container.resolve(RedisCacheProvider)
}

container.registerInstance<ICacheProvider>('CacheProvider', cacheProvider[cacheConfig.driver]);
