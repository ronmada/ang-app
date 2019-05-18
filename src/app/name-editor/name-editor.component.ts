import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  courses : any
  courseid : any
  smgroup: String[] = []
  nameForm = this.fb.group({
    add_single_course: [''],
    sm_group: ['']
  })

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.courseid = this.nameForm.value.add_single_course
    this.getOneCourse()
    console.warn(this.nameForm.value.add_single_course);
  }
  /*
  get aliases() {
    return this.nameForm.get('firstName') as FormArray;
  }
  */
  getOneCourse(){
    let params= new HttpParams().set('courseid' , this.courseid)
    console.log(this.courseid)
    this.courses = this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
  }
  push_one_to_sm(){
    this.smgroup.push(this.nameForm.value.sm_group)
    console.log(this.smgroup)
  }
}
