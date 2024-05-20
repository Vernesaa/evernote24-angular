import {Todo} from "./todo";
import {Lists} from "./lists";

export class ListFactory {

  static empty():Lists{
    return new Lists(0,'',0,[]);
  }
  static fromObject(rawList:any):Lists{
    return new Lists(
      rawList.id,
      rawList.name,
      rawList.user_id,
      rawList.notes
    );
  }
}
