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
  inputItem: string = "";
  button_value: string;
  selected_course: any;
  classes: Set<string>;
  displayParameters: string[] = ["ID", "Name"];
  chosen_course: any[] = [];
  names: any[] = [
    { lab: Set, value: "lab", disabled: 1 },
    { pract: Set, value: "Practice", disabled: 1 },
    { lect: Set, value: "Lecture", disabled: 1 },
    { q_a: Set, value: "q_a", disabled: 1 }
  ];
  labs: any[] = [];
  pract: any[] = [];
  lect: any[] = [];
  q_a: any[] = [];
  model: string[];
  struct: Struct;
  // lesson: any[] = [
  //   { value: "lecture", viewValue: "lecture", disabled: 1 },
  //   { value: "practice", viewValue: "practice", disabled: 1 },
  //   { value: "q_a", viewValue: "q_a", disabled: 1 },
  //   { value: "lab", viewValue: "lab", disabled: 1 }
  // ];
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
  resetItems() {
    this.inputItem = undefined;

    this.names[0].lab = new Set();
    this.names[1].pract = new Set();
    this.names[2].lect = new Set();
    this.names[3].q_a = new Set();
    this.classes = new Set();
    this.selected_course = "";
  }
  onSelect(course) {
    this.selected_course = course;
    console.log("this.selected_course", this.selected_course);
    this.resetItems();
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
    for (let cor of course) {
      console.log("cor", cor);
      console.log("COURSE length", cor.__Course_Group__.lectures.length);
      if (cor.__Course_Group__.lectures.length > 0) {
        this.classes.add("Lecture");
        this.names[2].disabled = 0;
        for (let co of cor.__Course_Group__.lectures) {
          console.log("kitas: ", co.__Kita__);
          for (let c of co.__Kita__.lectures) {
            console.log("lecturers: ", c.__Lect__.lecturer);
            this.names[2].lect.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.practices.length > 0) {
        this.classes.add("Practice");
        this.names[1].disabled = 0;
        for (let co of cor.__Course_Group__.practices) {
          console.log("kitas: ", co.__Kita__);
          for (let c of co.__Kita__.lectures) {
            console.log("lecturers: ", c.__Lect__.lecturer);
            this.names[1].pract.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.q_and_as.length > 0) {
        this.classes.add("q_a");
        this.names[3].disabled = 0;
        for (let co of cor.__Course_Group__.q_and_as) {
          console.log("kitas: ", co.__Kita__);
          for (let c of co.__Kita__.lectures) {
            console.log("lecturers: ", c.__Lect__.lecturer);
            this.names[3].q_a.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.labs.length > 0) {
        this.classes.add("lab");
        this.names[0].disabled = 0;
        for (let co of cor.__Course_Group__.labs) {
          console.log("kitas: ", co.__Kita__);
          for (let c of co.__Kita__.lectures) {
            console.log("lecturers: ", c.__Lect__.lecturer);
            this.names[0].lab.add(c.__Lect__.lecturer);
          }
        }
        console.log("lecturers: lab ", this.names[0].lab);
      }

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
    console.log("Lab Length:", this.names[0].lab.size);
    const entries = Object.entries(this.names);
    console.log(entries);
    // console.log("Lesson:", this.lesson);
    // console.log("Lesson index:", this.lesson.indexOf("lab"));
    // const values = Object.values(this.lesson);
    // console.log(values);
  }
  doSomething(event) {
    console.log("event", event);
  }
}
