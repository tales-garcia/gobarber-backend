import { container } from "tsyringe";
import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import AppointmentDAO from "@modules/appointment/infra/mongoose/DAOs/AppointmentDAO";
import IUserDAO from "@modules/user/DAOs/IUserDAO";
import UserDAO from "@modules/user/infra/mongoose/DAOs/UserDAO";
import BCryptHashProvider from "@modules/user/providers/HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "@modules/user/providers/HashProvider/models/IHashProvider";

container.registerSingleton<IAppointmentDAO>('AppointmentDAO', AppointmentDAO);
container.registerSingleton<IUserDAO>('UserDAO', UserDAO);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
