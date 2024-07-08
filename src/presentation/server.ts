import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource-impl";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { CronService } from "./cron/cron-service";


//PARA LA INYECCION DE DEPENDENCIAS
//CREAMOS LA INSTANCIA QUE VAMOS A REQUERIR AL UTILIZAR LOS USE CASES
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()  //<---AIXÒ HO PODEM CANVIAR PEL TIPUS DE LOG QUE VOLEM
);



export class Server {

    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                console.log('5 seg');
                //INYECCION DE DEPENDENCIAS CON FUNCIONES
                //PARA SEPARAR RESPONSABILIDADES
                //EL LOG PUEDE ESTAR EN OTRO PLUGUIN NO EN
                //EL PLUGUIN DE CRON
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('success'),
                    (error) => console.log(error)
                ).execute('http://localhost:3000')
                
            }
        );


        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         console.log('2 seg');
                
        //     }
        // );


    }
}