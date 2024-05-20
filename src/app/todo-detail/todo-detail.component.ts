import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../shared/note";
import {NoteStoreService} from "../shared/note-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";
import {TodoStoreService} from "../shared/todo-store.service";
import {TodoFactory} from "../shared/todo-factory";
import {ToastrService} from "ngx-toastr";
import {Tags} from "../shared/tags";
import {TagsFactory} from "../shared/tags-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-todo-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './todo-detail.component.html',
  styles: ``
})
export class TodoDetailComponent implements OnInit{
  @Input() todo:Todo = TodoFactory.empty();
  @Input() tags: Tags = TagsFactory.empty();

  @Output() showListEvent=new EventEmitter<any>();

  constructor(
    private en:TodoStoreService,
    private route:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService:AuthenticationService
  ){}

  ngOnInit(){
    const params=this.route.snapshot.params;
    this.en.getSingle(params['id'])
      .subscribe((t:Todo)=>this.todo=t);
  }

  removeTodo() {
    if (confirm('Todo wirklich löschen?')) {
      this.en.remove(this.todo.id)
        .subscribe((res: any) => {this.router.navigate(['../'], {
          relativeTo: this.route
        });  this.toastr.success('Notiz gelöscht!', "Evernote");
        });
    }
  }


}
