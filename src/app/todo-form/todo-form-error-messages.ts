
export class ErrorMessages {

  constructor(
    public forControl:string,
    public forValidator:string,
    public text:string
  ){}


}

export const TodoFormErrorMessages=[
  new ErrorMessages('title','required','Ein Todotitel mussangegeben werden'),]
