import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListsListComponent} from "./lists-list/lists-list.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailComponent} from "./note-detail/note-detail.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailComponent} from "./todo-detail/todo-detail.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {ListFormComponent} from "./list-form/list-form.component";
import {FormsWrapperComponent} from "./forms-wrapper/forms-wrapper.component";
import {ListDetailsComponent} from "./list-details/list-details.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'lists',component: ListsListComponent},
  {path:'lists/:id',component:ListDetailsComponent},
  {path:'notes',component: NoteListComponent},
  {path:'notes/:id',component:NoteDetailComponent},
  {path:'todos',component: TodoListComponent},
  {path:'todos/:id',component:TodoDetailComponent},
  {path: 'admin', component: FormsWrapperComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/note-form',component:NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/note-form/:id',component:NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/todos-form',component:TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/todos-form/:id',component:TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/lists-form',component:ListFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/lists-form/:id',component:ListFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path: 'login', component: LoginComponent},
];
