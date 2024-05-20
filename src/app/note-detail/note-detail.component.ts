import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../shared/note";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteStoreService} from "../shared/note-store.service";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {NoteFactory} from "../shared/note-factory";
import {ToastrService} from "ngx-toastr";
import {TodoFactory} from "../shared/todo-factory";
import {Todo} from "../shared/todo";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {Tags} from "../shared/tags";
import {TagsFactory} from "../shared/tags-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-note-detail',
  standalone: true,
  imports: [NoteListItemComponent, RouterLink, TodoListItemComponent],
  templateUrl: './note-detail.component.html',
  styles: ``
})
export class NoteDetailComponent implements OnInit {

  @Input() note: Note = NoteFactory.empty();
  @Input() todo: Todo = TodoFactory.empty();
  @Input() tags: Tags = TagsFactory.empty();

  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private en: NoteStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService:AuthenticationService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.en.getSingle(params['id'])
      .subscribe((n: Note) => this.note = n);
  }

  removeNote() {
    if (confirm('Notiz wirklich löschen?')) {
      this.en.remove(this.note.id)
        .subscribe((res: any) => {
          this.router.navigate(['../'], {
            relativeTo: this.route
          });
          this.toastr.success('Notiz gelöscht!', "Evernote");
        });
    }
  }




}
