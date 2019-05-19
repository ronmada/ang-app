import { Component , OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Struct } from "../../models/Struct";
import { CourseService } from '../../Services/course.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-submit-to-ga',
  templateUrl: './submit-to-ga.component.html',
  styleUrls: ['./submit-to-ga.component.css']
})
export class SubmitToGAComponent implements OnInit{
  result:Struct;
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  result__ : any
  aform = this.fb.group({
  })
  constructor(private http: HttpClient , private courseService:CourseService , private fb: FormBuilder) { }

  ngOnInit() {
    this.result = this.courseService.getCourse()
  }

  async onSubmit() {
    let params= new HttpParams()
    for (let cluster of this.result.clusters){
      let clus =''
      for (let course of cluster){
        if (clus ==''){
          clus = clus + course.Course.id
        }
        else{
          clus = clus + ' ' + course.Course.id
        }

      }
      params = params.append('cluster',clus)
    }



    let courses = ''
    for (let course of this.result.courses){
      if (courses ==''){
        courses = courses + course.Course.id
      }
      else{
        courses = courses + ' ' + course.Course.id
      }

    }
    params = params.append('courses',courses)

    console.log(params.getAll('cluster') )
    console.log(params.getAll('courses') )
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.ROOT_URL_local + '/start_ga', {params})
        .toPromise()
        .then(
          res => { // Success
            this.result__ = <JSON>res;
            resolve();

          }
        );
    });


    await promise
    console.log(this.result__)

  }
}
