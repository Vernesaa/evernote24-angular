import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {Note} from "../shared/note";

@Component({
  selector: 'en-home',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  constructor(private router:Router,private route:ActivatedRoute){}
  noteSelected(note:Note){
    this.router.navigate(['../notes',note.id],
      {relativeTo:this.route});
  }

}
