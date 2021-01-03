import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs';
import path from 'path';
import { tmpFolder, uploadsFolder } from "@config/upload";

export default class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(uploadsFolder, file)
    );

    return path.resolve(uploadsFolder, file);
  }
  async deleteFile(file: string): Promise<void> {
    const filepath = path.resolve(uploadsFolder, file);

    try {
      await fs.promises.stat(filepath);
    } catch {
      return;
    }

    await fs.promises.unlink(filepath);
  }
}
