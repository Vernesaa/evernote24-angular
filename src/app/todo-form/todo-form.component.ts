import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {TodoFactory} from "../shared/todo-factory";
import {NoteStoreService} from "../shared/note-store.service";
import {TodoStoreService} from "../shared/todo-store.service";
import {Note} from "../shared/note";
import {Todo} from "../shared/todo";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";
import {TodoFormErrorMessages} from "./todo-form-error-messages";

@Component({
  selector: 'en-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit{
  todoForm:FormGroup;
  todo=TodoFactory.empty();
  errors:{[key:string]:string}={};
  isUpdatingTodo=false;
  images:FormArray;

  constructor(
    private fb:FormBuilder,
    private en:TodoStoreService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.todoForm=this.fb.group({});
    this.images=this.fb.array([]);
  }


  ngOnInit(){
    const title=this.route.snapshot.params["title"];
    if(title){
      this.isUpdatingTodo=true;
      this.en.getSingle(title).subscribe(note=>{
        this.todo = note;
        this.initTodo();
      });
    }
    this.initTodo();
  }

  initTodo(){
    this.buildThumbnailsArray();
    this.todoForm=this.fb.group({
      id: this.todo.id,
      title:[this.todo.title,Validators.required],
      description:this.todo.description,
      images:this.images
    });
    this.todoForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  buildThumbnailsArray(){
    if(this.todo.images){
      this.images=this.fb.array([]);
      for(let img of this.todo.images){
        let fg=this.fb.group({
          id:new FormControl(img.id),//this.fb.control(img.id),
          url:new FormControl(img.url,[Validators.required]),
          title:new FormControl(img.title,[Validators.required])
        });
        this.images.push(fg);
      }
    }
  }

  addThumbnailControl(){
    this.images.push(this.fb.group({id:0,url:null,title:null}));
  }

  submitForm() {
    //filteremptyvalues
    this.todoForm.value.images = this.todoForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url
    );

    const todo: Todo = NoteFactory.fromObject(this.todoForm.value);

    if (this.isUpdatingTodo) {
      this.en.update(todo).subscribe(res => {
        this.router.navigate(["../../todos", todo.id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log(todo);
      this.en.create(todo).subscribe(res => {
        this.todo = NoteFactory.empty();
        this.todoForm.reset(NoteFactory.empty());
        this.router.navigate(["../todos"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages(){
    console.log("Ist ungültig?"+this.todoForm.invalid);
    this.errors={};
    for(const message of TodoFormErrorMessages){
      const control=this.todoForm.get(message.forControl);
      if(
        control &&
        control.dirty &&
        control.invalid && control.errors&&
        control.errors[message.forValidator]&&
        !this.errors[message.forControl]
      ){
        this.errors[message.forControl]=message.text;
      }
    }

  }

}
