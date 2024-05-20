import {Image} from "./image";

export class Todo {
  constructor( public id: number,
               public title: string,
               public description: string,
               public images?: Image[])
  {}

  }


