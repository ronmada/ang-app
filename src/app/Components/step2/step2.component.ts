import { Component , OnInit, Input } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']

})
export class Step2Component implements OnInit {
  button_value: string;
  displayParameters: string[] = ['ID','Name'];
  chosen : string

  public radiogroup: FormGroup;
  option3Disable=true;
  testForm = this.fb.group({
           option1: [{disabled:true}],
           option2: [],
           option3: [],

   });
  constructor(
    public courseService : CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) { }
    ngOnInit(){

    }
    handleChange(evt){
    console.log("Event:" , evt);
}
}
