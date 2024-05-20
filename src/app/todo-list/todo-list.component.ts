import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../shared/todo";
import {Lists} from "../shared/lists";
import {TodoStoreService} from "../shared/todo-store.service";
import {RouterLink} from "@angular/router";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";

@Component({
  selector: 'a.en-todo-list',
  standalone: true,
  imports: [
  TodoListItemComponent,
    RouterLink
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit{

  todos: Todo[] = [];

  @Output() showDetailsEvent=new EventEmitter <Lists>();


  constructor(private en:TodoStoreService){}
  ngOnInit() {
    this.en.getAll().subscribe(res=>this.todos=res);
  }

}
