import { Component, OnInit , Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Struct } from "../../models/Struct";
import { CourseService } from "../../Services/course.service"
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent {
  addsingleCourseForm = this.fb.group({
    add_single_course: ['11004']
  })

  constructor(private fb: FormBuilder,  private courseService : CourseService) { }

  onSubmit() {
    console.log("\nTrying to add a single course")
    this.courseService.getoneCourse(this.addsingleCourseForm.value.add_single_course)
    .then(
      singleCourse => {
      this.courseService.addStructerCourses(singleCourse)
      console.log('added one course to single courselist was successful... ID:  ', singleCourse.__Course__.id,
      'Coursename:  ' , singleCourse.__Course__.course_name , )
      })
  }
}

