import exp from "constants";
import { publicDecrypt } from "crypto";

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOption {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string; 
}



export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;  //En que archivo se disparó el log


    constructor( options: LogEntityOption  ) {
        this.message = options.message;
        this.level = options.level;
        this.origin = options.origin;
        (options.createdAt)
            ? this.createdAt = options.createdAt
            : this.createdAt = new Date();
    }

    //{"level": "high", "message": "Hola mndo", "createdAt":"123TLS9522121ASDF"}
    static fromJson(json: string ) : LogEntity {
        const { message, level, origin, createdAt } = JSON.parse(json);
        if (!message) throw new Error('Message is required');
        if (!level) throw new Error('Level is required');
        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });
        return log;
    }


}
