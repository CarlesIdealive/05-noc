import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendEmailLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

//NORMALMENTE SON LOS CASOS DE USO QUINES LLAMAN LOS REPOSITORIES!!!!
export class SendEmailLogs implements SendEmailLogsUseCase {
    //inyeccion de dependencias del servicio y el repositorio
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}
    
    //Ejecutamos el envio de correo electronico
    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Email not sent');
            }
            const log = new LogEntity({
                message: `Log Email sent succesfully`,
                level: LogSeverityLevel.low,
                origin: 'UseCase send-email-logs.ts'
            });
            this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'UseCase send-email-logs.ts'
            });
            this.logRepository.saveLog(log);
            return false
        }
    }




}