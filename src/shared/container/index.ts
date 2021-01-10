import { container } from "tsyringe";

import '@modules/user/providers';
import './providers';

import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import AppointmentDAO from "@modules/appointment/infra/mongoose/DAOs/AppointmentDAO";

import IUserDAO from "@modules/user/DAOs/IUserDAO";
import UserDAO from "@modules/user/infra/mongoose/DAOs/UserDAO";
import IUserTokenDAO from "@modules/user/DAOs/IUserTokenDAO";
import UserTokenDAO from "@modules/user/infra/mongoose/DAOs/UserTokenDAO";

container.registerSingleton<IAppointmentDAO>('AppointmentDAO', AppointmentDAO);
container.registerSingleton<IUserDAO>('UserDAO', UserDAO);
container.registerSingleton<IUserTokenDAO>('UserTokenDAO', UserTokenDAO);
