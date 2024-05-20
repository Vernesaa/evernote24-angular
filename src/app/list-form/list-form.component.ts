import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {ListFactory} from "../shared/list-factory";
import {NoteStoreService} from "../shared/note-store.service";
import {ListsStoreService} from "../shared/lists-store.service";
import {Note} from "../shared/note";
import {Lists} from "../shared/lists";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";
import {ListFormErrorMessages} from "./list-form-error-messages";

@Component({
  selector: 'en-list-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './list-form.component.html',
  styles: ``
})
export class ListFormComponent implements OnInit{
  listForm:FormGroup;
  list=ListFactory.empty();
  errors:{[key:string]:string}={};
  isUpdatingList=false;
  images:FormArray;

  constructor(
    private fb:FormBuilder,
    private en:ListsStoreService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.listForm=this.fb.group({});
    this.images=this.fb.array([]);
  }

  ngOnInit(){
    const name=this.route.snapshot.params["name"];
    if(name){
      this.isUpdatingList=true;
      this.en.getSingle(name).subscribe(list=>{
        this.list = list;
        this.initList();
      });
    }
    this.initList();
  }

  initList(){

    this.listForm=this.fb.group({
      id: this.list.id,
      name:[this.list.name,Validators.required],
    });
    this.listForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  submitForm() {
    const list: Lists = ListFactory.fromObject(this.listForm.value);

    if (this.isUpdatingList) {
      this.en.update(list).subscribe(res => {
        this.router.navigate(["../../lists", list.id], {
          relativeTo: this.route
        });
      });
    } else {
      list.user_id = 1;
      console.log(list);
      this.en.create(list).subscribe(res => {
        this.list = ListFactory.empty();
        this.listForm.reset(ListFactory.empty());
        this.router.navigate(["../lists"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages(){
    console.log("Ist ungültig?"+this.listForm.invalid);
    this.errors={};
    for(const message of ListFormErrorMessages){
      const control=this.listForm.get(message.forControl);
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
