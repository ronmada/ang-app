import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Struct } from "../models/Struct";
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})

export class CourseService implements OnInit{
  courses : any[] =[];
  clusters: any[] = [];
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  readonly ROOT_URL = 'https://infoplus.azurewebsites.net'
  constructor(private http:HttpClient)  {}

  ngOnInit(){
    this.courses = []
    this.clusters = []
  }

  getCourses() {
    return this.courses
  }
  getClusters(){
    return this.clusters
  }

  addStructerCourses(course){
      this.courses.push(course)
      console.dir('Single courses list: ' , this.courses)
  }

  addStructerCluster(cluster){
    this.clusters.push(cluster)
  }

   async submitSingleCourse(courseid){
    let courseres : any
    let promise = new Promise((resolve, reject) => {
      let params= new HttpParams().set('courseid' , courseid)
      this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
        .toPromise()
        .then(
          res => { // Success
            courseres = res;
          console.dir('course object to be inserted: ' , courseres)
          resolve();
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
    await promise
    return courseres
  }
  /*
    let promise = new Promise((resolve, reject) => {
      let params= new HttpParams().set('courseid' , courseid)
      this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
        .toPromise()
        .then(
          res => { // Success
            this.courseres = <JSON>res;
            resolve();
          }
        )
    })
    await promise
    console.log(this.courseres)
    return this.courseres
  }
  */

}
