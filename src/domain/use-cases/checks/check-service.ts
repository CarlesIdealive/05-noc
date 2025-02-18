import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
    execute( url: string) : Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string ) => void;
const module_name : string = 'Check-Service';

export class CheckService implements CheckServiceUseCase {
    //INYECTA EL LOGREPOSITORY
    constructor(
        private readonly logRepository : LogRepository,
        private readonly successCalback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    //NO SE HACE STATIC PORQUE VAMOS A UTILIZAR D.I.
    public async execute( url : string) : Promise<boolean> {

        try {
            const req = await fetch( url );
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message: `Url: ${url} is running`, 
                level: LogSeverityLevel.low,
                origin: module_name
            });
            this.logRepository.saveLog(log );
            this.successCalback();
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: module_name
            });
            this.logRepository.saveLog(log);
            this.errorCallback(errorMessage)
            return false;
        }

    }


}