import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lists, Note} from "../shared/lists";
import {ListListItemComponent} from "../list-list-item/list-list-item.component";
import {ListsStoreService} from "../shared/lists-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ListFactory} from "../shared/list-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'en-list-details',
  standalone: true,
  imports: [
    ListListItemComponent,
    RouterLink
  ],
  templateUrl: './list-details.component.html',
  styles: ``
})
export class ListDetailsComponent implements OnInit {
  @Input() list: Lists = ListFactory.empty();

  @Output() showListEvent = new EventEmitter<any>();


  constructor(
    private en: ListsStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService:AuthenticationService
  ) {
  }


  ngOnInit() {
    const params = this.route.snapshot.params;
    this.en.getSingle(params['id'])
      .subscribe((l: Lists) => this.list = l);
  }

  removeList() {
    if (confirm('Liste wirklich löschen?')) {
      this.en.remove(this.list.id)
        .subscribe((res: any) => this.router.navigate(['../'], {
          relativeTo: this.route
        })

        );
      this.toastr.success('Liste gelöscht!', "Evernote");
    }

  }

}

