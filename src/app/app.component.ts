import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ListsListComponent} from "./lists-list/lists-list.component";
import {ListDetailsComponent} from "./list-details/list-details.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'en-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ListsListComponent, ListDetailsComponent, NoteListComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'evernote24';


  constructor(private authService:AuthenticationService){ }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return"Logout";
    }else{
      return"Login";
    }
  }




}
