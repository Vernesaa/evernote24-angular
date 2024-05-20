import {Tags} from "./tags";

export class TagsFactory {
  static empty():Tags{
    return new Tags(0,'');
  }

  static fromObject(rawTag:any):Tags{
    return new Tags(rawTag.id, rawTag.name)
  }
}
