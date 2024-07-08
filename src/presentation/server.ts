import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/logs/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource-impl";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
// import { EmailServiceO } from "./email/email.service-old";

//PARA LA INYECCION DE DEPENDENCIAS 
//CREAMOS LA INSTANCIA QUE VAMOS A REQUERIR AL UTILIZAR LOS USE CASES
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()  //<---AIXÒ HO PODEM CANVIAR PEL TIPUS DE LOG QUE VOLEM
);


//PARA EL USE CASE NECESITAMOS INYECTAR EL SERVICIO
const emailService = new EmailService();



export class Server {

    public static start() {

        console.log('Server started...');

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         console.log('5 seg');
        //         //INYECCION DE DEPENDENCIAS CON FUNCIONES
        //         //PARA SEPARAR RESPONSABILIDADES
        //         //EL LOG PUEDE ESTAR EN OTRO PLUGUIN NO EN
        //         //EL PLUGUIN DE CRON
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log('success'),
        //             (error) => console.log(error)
        //         ).execute('http://localhost:3000')
                
        //     }
        // );


        //MANDAR EMAIL VIS REPOSITORY
        //EL EMAIL SERVICE INYECTA LOGREPOSITORY
        // const emailService = new EmailService(fileSystemLogRepository);
        // const result = emailService.sendEmail({
        //     to:'carles.labrana@idealiveconsulting.com',
        //     subject: 'Test desde Node JS',
        //     htmlBody: `
        //         <h1>Esto es una prueba</h1>
        //         <p>lCommodo irure irure tempor aliqua incididunt do aute amet commodo sunt reprehenderit culpa.</p>
        //         <p>Ver logs adjuntos</p>
        //     `
        // });

        // const result = emailService.sendEmailWithFileSystemLogs(['carles.labrana@idealiveconsulting.com']);
        

        //MANDAR EMAIL VIA USE CASE
        //MODIFICAR EL EMAILSERVICE PUES EL USE CASE YA SE OCUPA DEL LOG REPOSITORY
        const useCase = new SendEmailLogs(emailService,fileSystemLogRepository);
        const result = useCase.execute('carles.labrana@idealiveconsulting.com');


    }
}