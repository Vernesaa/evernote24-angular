import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Note} from "../shared/note";
import {Image} from "../shared/image";
import {Lists} from "../shared/lists";
import {NoteStoreService} from "../shared/note-store.service";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-note-list',
  standalone: true,
  imports: [
    NoteListItemComponent,
    RouterLink
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit {

  notes: Note[] = [];


  constructor(private en:NoteStoreService){}
  ngOnInit() {
    this.en.getAll().subscribe(res=>this.notes=res);
  }
}
