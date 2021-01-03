import IStorageProvider from "../models/IStorageProvider";

export default class DiskStorageProviderMock implements IStorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }
  async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(
      storedFile => storedFile === file
    );

    this.storage.splice(fileIndex, 1);
  }
}
