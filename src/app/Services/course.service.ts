import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Struct } from "../models/Struct";

@Injectable({
  providedIn: 'root'
})

export class CourseService implements OnInit{
  courses : any[] =[];
  clusters: any[] = [];
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

  addStructerCourses(curse){
      this.courses.push(curse)
  }

  addStructerCluster(cluster)
  {
    this.clusters.push(cluster)
  }


}
