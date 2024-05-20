import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {Note} from "../shared/note";
import {NoteStoreService} from "../shared/note-store.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'en-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup=new EventEmitter<string>();
  foundNotes:Note[]=[]
  isLoading=false;
  @Output () noteSelected = new EventEmitter<Note>();

  constructor(private en:NoteStoreService){}
  ngOnInit(){
    this.keyup.pipe(filter(term=>term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=>this.isLoading=true))
      .pipe(switchMap(searchTerm=> this.en.getAllSearch(searchTerm)))
      .pipe(tap(()=>this.isLoading=false))
      .subscribe(notes=>this.foundNotes=notes);
  }

}
