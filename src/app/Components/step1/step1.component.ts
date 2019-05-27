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
  group_submit_button_booly :boolean = false
  constructor(
    private fb: FormBuilder,
    public courseService : CourseService,
    private route: ActivatedRoute,
    private router: Router,
    ) {   }

  ngOnInit() {
    this.courseService.set_clicked_array_to_false()

  }

  onSubmitoneCourseform() {
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
    this.group_submit_button_booly=false
  }

  push_one_to_sm(){
    this.courseService.getoneCourse(this.chooseCourseForm.get('add_selfmade_course').value)
    .then(
      singleCourse_cluster => {
      this.smgroup.push(singleCourse_cluster)
      this.group_submit_button_booly = true
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
    this.courseService.remove_single_Course(index)
    console.log("after: " , this.courseService.getstruct().courses)
  }

  remove_clusterfromlist(index){
    this.cluster_show_booly.pop()
    this.courseService.remove_one_cluster(index)
    console.log("after: " , this.courseService.getstruct().clusters)
  }

  remove_coursefromcluster(index , course){
    this.courseService.remove_one_course_from_cluster(index,course)
    console.log("after: " , this.courseService.getstruct().clusters)
    if ( !this.courseService.getstruct().clusters[index].length)
    {
      this.cluster_show_booly.pop()
      this.courseService.remove_one_cluster(index)
    }
  }

  remove_temp_course_from_cluster(index){
    this.smgroup.splice(index,1)
    if ( !this.smgroup.length)
      this.group_submit_button_booly=false
  }
}
