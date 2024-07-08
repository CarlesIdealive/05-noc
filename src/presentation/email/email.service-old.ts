/* PATRON ADAPTADOR PARA EL NODE MAILER */
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}


/*
*   FALTA MONIROEAR EL ENVIO DE EMAILS TAMBIEN
*   INYECCION DE DEPENDENCIAS
*/


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass:envs.MAILER_SECRET_KEY
        }
    });

    constructor(
        private readonly logRepository: LogRepository
    ){}


    async sendEmail( options: SendEmailOptions ):Promise<boolean> {
        const {to, subject, htmlBody, attachements=[]} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });
            // console.log(sentInformation);
            const log = new LogEntity({
                message: 'Email Send',
                level: LogSeverityLevel.medium,
                origin: 'Email Service',
            });
            this.logRepository.saveLog(log);
            
            return true;            
        } catch (error) {
            const log = new LogEntity({
                message: 'Email was NOT Send',
                level: LogSeverityLevel.high,
                origin: 'Email Service',
            });
            this.logRepository.saveLog(log);

            return false;
        }
    }


    async sendEmailWithFileSystemLogs( to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody= `<h4>el body</h4>`;
        const attachements: Attachment[] = [
            { filename:'logs-all.log' , path:'./logs/logs-all.log'},
            { filename:'logs-high.log' , path:'./logs/logs-high.log'},
            { filename:'logs-medium.log' , path:'./logs/logs-medium.log'},
        ]

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachements
        });

    }


}