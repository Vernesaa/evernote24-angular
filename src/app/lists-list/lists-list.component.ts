import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Lists} from "../shared/lists";
import {ListListItemComponent} from "../list-list-item/list-list-item.component";
import {ListsStoreService} from "../shared/lists-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-lists-list',
  standalone: true,
  imports: [
    ListListItemComponent,
    RouterLink
  ],
  templateUrl: './lists-list.component.html',
  styles: ``
})
export class ListsListComponent implements OnInit{

  lists: Lists[] = [];

  @Output() showDetailsEvent=new EventEmitter <Lists>();


  constructor(private en:ListsStoreService){}
  ngOnInit() {
    this.en.getAll().subscribe(res=>this.lists=res);
  }
}
