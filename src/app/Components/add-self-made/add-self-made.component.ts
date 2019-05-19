import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Struct } from "../../models/Struct";

@Component({
  selector: 'app-add-self-made',
  templateUrl: './add-self-made.component.html',
  styleUrls: ['./add-self-made.component.css']
})
export class AddSelfMadeComponent {
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  smgroup: any[] = []
  clusters : Struct
  result : any
  selfmadeForm = this.fb.group({
    add_selfmade_course: ['11005'],
  })


  constructor(private fb: FormBuilder, private http: HttpClient) { }

  onSubmit(){
    //push the current cluster to the clusters
    this.clusters.clusters.push(this.smgroup)
    //empty current cluster
    this.smgroup=[]
    console.log(this.clusters);
  }

  async push_one_to_sm(){
    let courseid = this.selfmadeForm.value.add_selfmade_course
    let promise = new Promise((resolve, reject) => {
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
    console.log(this.result);
    this.smgroup.push(this.result)

    //let params= new HttpParams().set('courseid' , courseid)
    //this.somecourse = this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
    //this.smgroup.push(this.somecourse)
  }
}
