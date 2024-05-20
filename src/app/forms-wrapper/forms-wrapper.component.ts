import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'en-forms-wrapper',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './forms-wrapper.component.html',
  styleUrl: './forms-wrapper.component.css'
})
export class FormsWrapperComponent {

}
