export default class DuplicateValueError extends Error{

    constructor(message: string){
        super(message);
    }
}