export default class BadLoginError extends Error{

    constructor(message:string){
        super(message);
    }

}