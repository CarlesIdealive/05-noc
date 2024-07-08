import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

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