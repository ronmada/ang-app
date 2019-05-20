import { Injectable, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Struct } from "../models/Struct";
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})


export class CourseService implements OnInit{
  //courses : any[] =[];
  //clusters: any[] = [];
  struct : Struct
  ga_result : any
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  readonly ROOT_URL = 'https://infoplus.azurewebsites.net'

  constructor(private http:HttpClient)  {
    this.struct = new Struct()
  }

  ngOnInit(){}

  getstruct(){
    return this.struct
  }

  addStructerCourses(course){
      this.struct.courses.push(course)
      console.log('Single courses list: ' , this.struct.courses)
  }

  addStructerCluster(cluster){
    this.struct.clusters.push(cluster)
    console.log('clusters looks like this:' ,this.struct.clusters);
  }

  async getoneCourse(courseid){
    let courseres : any
    let promise = new Promise((resolve, reject) => {
      let params= new HttpParams().set('courseid' , courseid)
      this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
        .toPromise()
        .then(
          res => { // Success
            courseres = res;
            console.log('course object to be inserted: ' , courseres)
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

  getGAresults(){
    return this.ga_result
  }

  putGAresults(ga_result){
    this.ga_result = ga_result
  }

  async submitGA(struct : Struct){
    let params= new HttpParams()
    for (let cluster of struct.clusters){
      let clus =''
      for (let course of cluster){
        if (clus ==''){
          clus = clus + course.__Course__.id
        }
        else{
          clus = clus + ' ' + course.__Course__.id
        }

      }
      params = params.append('cluster',clus)
    }

    let courses = ''
    for (let course of struct.courses){
      if (courses ==''){
        courses = courses + course.__Course__.id
      }
      else{
        courses = courses + ' ' + course.__Course__.id
      }
    }
    params = params.append('courses',courses)
    console.log('clusters:', params.getAll('cluster') )
    console.log('single courses', params.getAll('courses') )
    let someresult
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.ROOT_URL_local + '/start_ga', {params})
        .toPromise()
        .then(
          res => { // Success
            someresult = <JSON>res;
            resolve();

          }
        );
    });
    await promise
    console.log('Struct looks like this after submit:  ' ,this.struct)
    console.log(someresult)
    console.log(someresult.classes[1]["Class type"])
    return someresult
  }

}
