import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements LogRepository {
    //Tipus Abstracte
    private logDataSource : LogDataSource;
    //INJECCIO DE DEPENDENCIA
    constructor(logDataSource : LogDataSource){
        this.logDataSource = logDataSource;
    }




    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }

}