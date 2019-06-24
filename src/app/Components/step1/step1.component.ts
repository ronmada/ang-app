import { Component, OnInit} from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-step1",
  templateUrl: "./step1.component.html",
  styleUrls: ["./step1.component.css"]
})
export class Step1Component implements OnInit {
  courseitem_ID: string[] = [];
  courseitem_Name: string[] = [];

  constructor(
    private fb: FormBuilder,
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.set_clicked_array_to_false();
    let res = this.courseService.course_id_name;
    for (let itemlist of res) {
      this.courseitem_Name.push(itemlist.course_name + "   " + itemlist.id);
      this.courseitem_ID.push(itemlist.id + "   " + itemlist.course_name);
    }
    this.courseService.send_search_option(
      this.courseitem_ID,
      this.courseitem_Name
    );
  }

  onSubmit_selfmadeform() {
    this.courseService.add_cluster_to_struct();
    this.courseService.check = [];
  }

  async onSubmit() {
    await this.courseService.submitGA(this.courseService.getstruct());
    this.router.navigate(["/ga-results"]);
  }

  next_step() {
    this.router.navigate(["/step-2"]);
  }

  remove_singlecourse_fromlist(index) {
    this.courseService.remove_single_Course(index);
  }

  remove_clusterfromlist(index) {
    this.courseService.remove_cluster_from_list(index);
  }

  remove_coursefromcluster(index, course) {
    this.courseService.remove_one_course_from_cluster(index, course);
  }

  remove_temp_course_from_cluster(index) {
    this.courseService.remove_temp_course_from_cluster(index);
  }
}
