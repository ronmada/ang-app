import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Struct } from "../../models/Struct";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"]
})
export class Step2Component implements OnInit {
  button_value: string;
  displayParameters: string[] = ["ID", "Name"];
  chosen_course: any[] = [];
  model: string[];
  struct: Struct;
  foods: any[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.struct = this.courseService.getstruct();
    console.log("Struct is:", this.struct);
  }
  onSelect(course) {
    let course_group: any[] = [];
    let emptyAray = [];
    for (let group of course.__Course__.groups) {
      course_group.push(group);
    }
    this.chosen_course = emptyAray.concat(course_group);
    console.log("chosen course groups:", this.chosen_course);
    this.check_course_types(this.chosen_course);
  }

  check_course_types(course) {
    let q_a: boolean = false;
    let lect: boolean = false;
    let pract: boolean = false;
    for (let cor of course) {
      console.log("cor", cor);
      console.log("COURSE length", cor.__Course_Group__.lectures.length);
      if (cor.__Course_Group__.lectures.length > 0) lect = true;
      if (cor.__Course_Group__.practices.length > 0) pract = true;
      if (cor.__Course_Group__.q_and_as.length > 0) q_a = true;
      // for (let co of cor) {
      //   console.log("LEngTH1", co.__Course_Group__.lectures.length);
      //   console.log("lengthL" , co.length)
      //   if (co.length){
      //      lect = true;
      //      console.log("there are X lectures:", co.length);
      //     //  this.lectures =
      //   }
      // }
    }
    console.log("lects" , lect , "practs" , pract , "q_a" , q_a)

  }
}
