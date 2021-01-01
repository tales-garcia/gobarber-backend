import BCryptHashProvider from "@modules/user/providers/HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "@modules/user/providers/HashProvider/models/IHashProvider";
import { container } from "tsyringe";

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
