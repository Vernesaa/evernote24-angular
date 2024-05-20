import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NoteFactory} from "../shared/note-factory";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteStoreService} from "../shared/note-store.service";
import {Note} from "../shared/note";
import {NoteFormErrorMessages} from "./note-form-error-messages";

@Component({
  selector: 'en-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm:FormGroup;
  note=NoteFactory.empty();
  errors:{[key:string]:string}={};
  isUpdatingNote=false;
  images:FormArray;


  constructor(
    private fb:FormBuilder,
    private en:NoteStoreService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.noteForm=this.fb.group({});
    this.images=this.fb.array([]);
  }


  ngOnInit(){
    const title=this.route.snapshot.params["title"];
    if(title){
      this.isUpdatingNote=true;
      this.en.getSingle(title).subscribe(note=>{
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  initNote(){
    this.buildThumbnailsArray();
    this.noteForm=this.fb.group({
      id: this.note.id,
      title:[this.note.title,Validators.required],
      description:this.note.description,
      images:this.images
    });
    this.noteForm.statusChanges.subscribe(()=>
      this.updateErrorMessages());
  }

  buildThumbnailsArray(){
    if(this.note.images){
      this.images=this.fb.array([]);
      for(let img of this.note.images){
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
    this.noteForm.value.images = this.noteForm.value.images.filter(
      (thumbnail: { url: string; }) => thumbnail.url
    );

    const note: Note = NoteFactory.fromObject(this.noteForm.value);

    if (this.isUpdatingNote) {
      this.en.update(note).subscribe(res => {
        this.router.navigate(["../../notes", note.id], {
          relativeTo: this.route
        });
      });
    } else {
      note.user_id = 1;//justfortesting
      console.log(note);
      this.en.create(note).subscribe(res => {
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(["../notes"], {relativeTo: this.route});
      });
    }
  }


    updateErrorMessages(){
    console.log("Ist ungültig?"+this.noteForm.invalid);
    this.errors={};
    for(const message of NoteFormErrorMessages){
      const control=this.noteForm.get(message.forControl);
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


