import {Note} from "./note";
export {Note} from "./note";

export class Lists {
  constructor(public id:number,
              public name:string,
              public user_id: number,
              public notes?:Note[]) {}
}
