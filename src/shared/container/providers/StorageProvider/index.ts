import { container } from "tsyringe";
import DiskStorageProvider from "./implementations/DiskStorageProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";
import IStorageProvider from "./models/IStorageProvider";
import uploadConfig from '@config/upload';

const providers = {
  disk: DiskStorageProvider,
  aws: S3StorageProvider
}

container.registerSingleton<IStorageProvider>('StorageProvider', providers[uploadConfig.driver]);
