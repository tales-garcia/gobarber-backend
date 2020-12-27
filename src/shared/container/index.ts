import { container } from "tsyringe";
import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import AppointmentDAO from "@modules/appointment/infra/mongoose/DAOs/AppointmentDAO";

container.registerSingleton<IAppointmentDAO>('AppointmentDAO', AppointmentDAO);
