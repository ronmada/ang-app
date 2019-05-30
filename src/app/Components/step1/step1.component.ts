import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.css"]
})
export class Step1Component implements OnInit {
  chooseCourseForm = this.fb.group({
    add_single_course: ["11004"],
    add_selfmade_course: ["11005"]
  });
  smgroup: any[] = [];
  cluster_show_booly: boolean[] = [];
  group_submit_button_booly: boolean = false;
  course_id_name : any[] = []
  itemList: any;
  course_id : String[] = [];
  course_name : String[] =[];
  courseitem : String[] = [];
  editorbooly: String = 'single';
  editor : String = 'Cluster'
  constructor(
    private fb: FormBuilder,
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.set_clicked_array_to_false();
    this.courseService.get__all_courses()
    .then (res => {
      this.itemList= res
      for (let itemlist of res)
      {
        this.course_id.push(itemlist.id)
        this.course_name.push(itemlist.course_name)
        this.courseitem.push(itemlist.id +'   '+ itemlist.course_name)
      }
        });
    }
  toggle_editor(){
    if(this.editorbooly == 'cluster'){
      this.editorbooly = 'single'
      this.editor= 'Cluster'
    }
    else{
      this.editorbooly = 'cluster'
      this.editor= 'Single Course'
    }
    this.courseService.define_editor(this.editorbooly)
  }
  onSubmitoneCourseform() {
    this.courseService
      .getoneCourse(this.chooseCourseForm.get("add_single_course").value)
      .then(singleCourse => {
        this.courseService.addStructerCourses(singleCourse);
        console.log(
          "added one course to single courselist was successful... ID:  ",
          singleCourse.__Course__.id,
          "Coursename:  ",
          singleCourse.__Course__.course_name
        );
      });
  }

  onSubmit_selfmadeform() {
    //push the current cluster to the clusters
    this.courseService.add_cluster_to_struct();
    // this.cluster_show_booly.push(false);
    // //empty current cluster
    // this.smgroup = [];
    // this.group_submit_button_booly = false;
  }

  push_one_to_sm() {
    this.courseService
      .getoneCourse(this.chooseCourseForm.get("add_selfmade_course").value)
      .then(singleCourse_cluster => {
        this.smgroup.push(singleCourse_cluster);
        this.group_submit_button_booly = true;
        console.log(
          "added one course to CLUTSER was successful... ID:  ",
          singleCourse_cluster.__Course__.id,
          "Coursename:  ",
          singleCourse_cluster.__Course__.course_name
        );
      });
  }
  async onSubmit() {
    await this.courseService.submitGA(this.courseService.getstruct());
    this.router.navigate(["/ga-results"]);
  }
  next_step() {
    this.router.navigate(["/step-2"]);
  }
  step_1() {
    this.router.navigate(["/step-1"]);
  }
  remove_singlecourse_fromlist(index) {
    this.courseService.remove_single_Course(index);
    console.log("after: ", this.courseService.getstruct().courses);
  }

  remove_clusterfromlist(index) {
    this.courseService.pop_cluster_booly(index)
    // this.courseService.remove_one_cluster(index);
    // console.log("after: ", this.courseService.getstruct().clusters);
  }

  remove_coursefromcluster(index, course) {
    this.courseService.remove_one_course_from_cluster(index, course);
    // console.log("after: ", this.courseService.getstruct().clusters);
    // if (!this.courseService.getstruct().clusters[index].length) {
    //   this.cluster_show_booly.pop();
    //   this.courseService.remove_one_cluster(index);
    // }
  }

  remove_temp_course_from_cluster(index) {
    this.courseService.remove_temp_course_from_cluster(index)
    // this.smgroup.splice(index, 1);
    // if (!this.smgroup.length) this.group_submit_button_booly = false;
  }
}
