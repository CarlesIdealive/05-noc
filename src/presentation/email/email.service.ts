/* PATRON ADAPTADOR PARA EL NODE MAILER */
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';

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

    constructor(){}


    async sendEmail( options: SendEmailOptions ):Promise<boolean> {
        const {to, subject, htmlBody, attachements=[]} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });
            
            return true;            
        } catch (error) {

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