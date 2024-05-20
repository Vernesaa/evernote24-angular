import {Todo} from "./todo";
import {Image} from "./image";

export class Note {
  constructor(public id:number,
              public title:string,
              public description:string,
              public user_id: number,
              public lists_id:number,
              public images?: Image[],
              public todos?:Todo[]
  ){}
}
