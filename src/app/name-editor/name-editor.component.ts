import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  courses : any
  courseid : any
  somecourse : any
  couresy: Observable<String>
  smgroup: any[] = []
  nameForm = this.fb.group({
    add_single_course: ['11004'],
    sm_group: ['11005']
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
    this.courses = this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
  }
  push_one_to_sm(){
    let acourse = this.nameForm.value.sm_group
    //console.log(this.smgroup)
    this.getOne(acourse)
  }
  getOne(courseid){
    let params= new HttpParams().set('courseid' , courseid)
    this.somecourse = this.http.get(this.ROOT_URL_local + '/getcorjs', {params}).subscribe()
    this.smgroup.push(this.somecourse[0])

  }
}
