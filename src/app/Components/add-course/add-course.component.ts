import { Component, OnInit , Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Struct } from "../../models/Struct";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent {
  @Input() course: Struct;
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  temp : any
  somecourse : any
  result : any
  addsingleCourseForm = this.fb.group({
    add_single_course: ['11004']
  })

  constructor(private fb: FormBuilder, private http: HttpClient) { }

 async onSubmit() {
    let promise = new Promise((resolve, reject) => {
    let courseid = this.addsingleCourseForm.value.add_single_course
    let params= new HttpParams().set('courseid' , courseid)
    this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
      .toPromise()
      .then(
        res => { // Success
          this.result = <JSON>res;
          resolve();

        }
      );
  });
  await promise
  console.log(this.result)
  console.log(this.course)
  this.course.courses.push(this.result)
  console.log(this.course)
  }
}

