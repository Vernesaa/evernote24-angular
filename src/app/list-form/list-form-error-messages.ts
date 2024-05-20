export class ErrorMessages {

  constructor(
    public forControl:string,
    public forValidator:string,
    public text:string
  ){}
}

export const ListFormErrorMessages=[
  new ErrorMessages('name','required','Ein Listtitel muss angegeben werden'),]
