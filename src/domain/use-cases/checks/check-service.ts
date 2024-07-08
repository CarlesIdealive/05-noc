interface CheckServiceUseCase {
    execute( url: string) : Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string ) => void;


export class CheckService implements CheckServiceUseCase {

    constructor(
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
            // console.log(`Url: ${url} is running`);
            this.successCalback();
            return true;
        } catch (error) {
            // console.log(`${ error }`);
            this.errorCallback(`${error}`)
            return false;
        }

    }


}