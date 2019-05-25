import { Component , OnInit, Input } from '@angular/core';
import { Struct } from "../../models/Struct";
import { CourseService } from '../../Services/course.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  chooseCourseForm = this.fb.group({
    add_single_course: ['11004'],
    add_selfmade_course: ['11005']
  })
  smgroup: any[] = []
  cluster_show_booly : boolean [] =[]

  constructor(
    private fb: FormBuilder,
    public courseService : CourseService,
    private route: ActivatedRoute,
    private router: Router,
    ) {   }

  ngOnInit() {

  }

  onSubmitoneCourseform() {
    console.log("\nTrying to add a single course")
    this.courseService.getoneCourse(this.chooseCourseForm.get('add_single_course').value)
    .then(
      singleCourse => {
      this.courseService.addStructerCourses(singleCourse)
      console.log('added one course to single courselist was successful... ID:  ', singleCourse.__Course__.id,
      'Coursename:  ' , singleCourse.__Course__.course_name , )
      })
  }
  onSubmit_selfmadeform(){
    //push the current cluster to the clusters
    this.courseService.addStructerCluster(this.smgroup)
    this.cluster_show_booly.push(false)
    //empty current cluster
    this.smgroup=[]
  }

  push_one_to_sm(){
    console.log("\nTrying to add a single course TO CLUSTER")
    this.courseService.getoneCourse(this.chooseCourseForm.get('add_selfmade_course').value)
    .then(
      singleCourse_cluster => {
      //this.courseService.addStructerCourses(singleCourse_cluster)
      this.smgroup.push(singleCourse_cluster)
      console.log('added one course to CLUTSER was successful... ID:  ', singleCourse_cluster.__Course__.id,
      'Coursename:  ' , singleCourse_cluster.__Course__.course_name)
      })
  }
  async onSubmit() {
    await this.courseService.submitGA(this.courseService.getstruct())
    this.router.navigate(['/ga-results']);
  }
  next_step(){
    this.router.navigate(['/step-2']);
  }
  step_1(){
    this.router.navigate(['/step-1']);
  }
  remove_singlecourse_fromlist(index){
    console.log("i is:" , index)
    console.log("Before: " , this.courseService.getstruct().courses)
    this.courseService.remove_single_Course(index)
    console.log("after: " , this.courseService.getstruct().courses)
  }

  remove_clusterfromlist(index){
    this.cluster_show_booly.pop()
    console.log("j is:" , index)
    console.log("Before: " , this.courseService.getstruct().clusters)
    this.courseService.remove_one_cluster(index)
    console.log("after: " , this.courseService.getstruct().clusters)
  }

  remove_coursefromcluster(index , course){
    console.log("Before: " , this.courseService.getstruct().clusters)
    this.courseService.remove_one_course_from_cluster(index,course)
    console.log("after: " , this.courseService.getstruct().clusters)
    if ( !this.courseService.getstruct().clusters[index].length){
      this.cluster_show_booly.pop()
      this.courseService.remove_one_cluster(index)
    }
  }
  toggleshowcluster(index){
  this.cluster_show_booly[index] = !this.cluster_show_booly[index]
  }

}
