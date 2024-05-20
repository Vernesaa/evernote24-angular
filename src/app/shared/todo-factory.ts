import {Note} from "./note";
import {Todo} from "./todo";

export class TodoFactory {

  static empty():Todo{
    return new Todo(0,'','',[{id:0,url:'',
      title:''}]);
  }
  static fromObject(rawTodo:any):Todo{
    return new Todo(
      rawTodo.id,
      rawTodo.title,
      rawTodo.description,
      rawTodo.images
    );
  }
}
