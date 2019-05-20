import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Struct } from "../../models/Struct";
import { CourseService } from "../../Services/course.service"

@Component({
  selector: 'app-add-self-made',
  templateUrl: './add-self-made.component.html',
  styleUrls: ['./add-self-made.component.css']
})
export class AddSelfMadeComponent {
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  smgroup: any[] = []
  selfmadeForm = this.fb.group({
    add_selfmade_course: ['11005'],
  })


  constructor(private fb: FormBuilder , private courseService : CourseService) { }

  onSubmit(){
    //push the current cluster to the clusters
    this.courseService.addStructerCluster(this.smgroup)
    //empty current cluster
    this.smgroup=[]
  }

  async push_one_to_sm(){
    console.log("\nTrying to add a single course TO CLUSTER")
    this.courseService.getoneCourse(this.selfmadeForm.value.add_selfmade_course)
    .then(
      singleCourse_cluster => {
      //this.courseService.addStructerCourses(singleCourse_cluster)
      this.smgroup.push(singleCourse_cluster)
      console.log('added one course to CLUTSER was successful... ID:  ', singleCourse_cluster.__Course__.id,
      'Coursename:  ' , singleCourse_cluster.__Course__.course_name , )
      })
/*
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
*/

    //let params= new HttpParams().set('courseid' , courseid)
    //this.somecourse = this.http.get(this.ROOT_URL_local + '/getcorjs', {params})
    //this.smgroup.push(this.somecourse)
  }
}
