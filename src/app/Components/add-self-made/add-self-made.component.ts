import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Struct } from "../../models/Struct";
import { CourseService } from "../../Services/course.service"

@Component({
  selector: 'app-add-self-made',
  templateUrl: './add-self-made.component.html',
  styleUrls: ['./add-self-made.component.css']
})
export class AddSelfMadeComponent {
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

  push_one_to_sm(){
    console.log("\nTrying to add a single course TO CLUSTER")
    this.courseService.getoneCourse(this.selfmadeForm.value.add_selfmade_course)
    .then(
      singleCourse_cluster => {
      //this.courseService.addStructerCourses(singleCourse_cluster)
      this.smgroup.push(singleCourse_cluster)
      console.log('added one course to CLUTSER was successful... ID:  ', singleCourse_cluster.__Course__.id,
      'Coursename:  ' , singleCourse_cluster.__Course__.course_name)
      })
  }
}
