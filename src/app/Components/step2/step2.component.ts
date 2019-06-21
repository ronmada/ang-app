import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { PreflectService } from "../../Services/preflect.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Struct } from "../../models/Struct";
import * as _ from "underscore";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"]
})
export class Step2Component implements OnInit {
  array: Array<any> = [];
  nones: string = "None";
  class_type: string = "";
  lecturers: Array<any>;
  selected_course: any;
  classes: Set<string>;
  chosen_course: any[] = [];
  names: any[] = [
    { labs: Set, value: "lab", disabled: 1, r_value: "labs" },
    { practices: Set, value: "Practice", disabled: 1, r_value: "practices" },
    { lectures: Set, value: "Lecture", disabled: 1, r_value: "lectures" },
    { q_and_as: Set, value: "q_a", disabled: 1, r_value: "q_and_as" }
  ];
  struct: Struct;

  constructor(
    public courseService: CourseService,
    public preflectService: PreflectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.struct = this.courseService.getstruct();
    console.log("Struct is:", this.struct);
    this.array = this.preflectService.get_Pref_Lect();
  }

  resetItems(course: object) {
    this.lecturers = new Array();
    this.names[0].labs = new Set();
    for (let i = 0; i < this.names.length; i++) this.names[i].disabled = 1;
    this.names[1].practices = new Set();
    this.names[2].lectures = new Set();
    this.names[3].q_and_as = new Set();
    this.classes = new Set();
    this.selected_course = course;
  }
  onSelectCourse(course: any) {
    this.resetItems(course);
    let course_group: object[] = [];
    for (let group of course.__Course__.groups) {
      course_group.push(group);
    }
    this.chosen_course = course_group;
    console.log("chosen course groups:", this.chosen_course);
    this.check_course_types(this.chosen_course);
  }

  check_course_types(course: Array<any>) {
    for (let cor of course) {
      if (cor.__Course_Group__.lectures.length > 0) {
        this.classes.add("Lecture");
        this.names[2].disabled = 0;
        for (let co of cor.__Course_Group__.lectures) {
          for (let c of co.__Kita__.lectures) {
            this.names[2].lectures.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.practices.length > 0) {
        this.classes.add("Practice");
        this.names[1].disabled = 0;
        for (let co of cor.__Course_Group__.practices) {
          for (let c of co.__Kita__.lectures) {
            this.names[1].practices.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.q_and_as.length > 0) {
        this.classes.add("q_a");
        this.names[3].disabled = 0;
        for (let co of cor.__Course_Group__.q_and_as) {
          for (let c of co.__Kita__.lectures) {
            this.names[3].q_and_as.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.labs.length > 0) {
        this.classes.add("lab");
        this.names[0].disabled = 0;
        for (let co of cor.__Course_Group__.labs) {
          for (let c of co.__Kita__.lectures) {
            this.names[0].labs.add(c.__Lect__.lecturer);
          }
        }
      }
    }
  }
  onSelectClassType(class_index: number, class_type: string) {
    this.reset_names(class_type);
    this.names[class_index][class_type].forEach((lect_name: string) => {
      this.lecturers.push(lect_name);
    });
  }
  reset_names(class_type: string) {
    this.class_type = class_type;
    this.lecturers = new Array();
  }
  onSelectLecturer(lecturer: string, class_type: string, course_id: string) {
    let obj = {
      id: course_id,
      classtype: class_type,
      lecturer: lecturer
    };
    if (obj.classtype == "lectures")
    {
      obj.classtype = "lecture"
    }
    if (obj.classtype == "labs")
    {
      obj.classtype = "lab"
    }
    if (obj.classtype == "practices")
    {
      obj.classtype = "practice"
    }
    if (obj.classtype == "q_and_as")
    {
      obj.classtype = "q_and_a"
    }

    this.check_chosen_lect(obj);
    console.log("Array is:", this.array);
  }
  check_chosen_lect(obj: any) {
    let flag: boolean = true;
    for (let [index, checker] of this.array.entries()) {
      if (!this.array.length) {
        this.preflectService.push_Pref_Lect(obj);
        break;
      }
      if (
        _.isEqual(checker, obj) ||
        (obj.id === checker.id && obj.classtype === checker.classtype)
      ) {
        flag = false;
        console.log("same course and classtype, swapping pref lecture!");
        this.preflectService.switchLect(obj, index);
        break;
      }
    }
    if (flag) {
      this.preflectService.push_Pref_Lect(obj);
    }
  }

  onSelectRemoveLect(class_type: string, id: string) {
    let obj = {
      id: id,
      classtype: class_type
    };
    for (let [index, checker] of this.array.entries()) {
      if (obj.id === checker.id && obj.classtype === checker.classtype) {
        console.log("Removing pref lecture");
        this.preflectService.removeSelectedPrefLect(index);
        break;
      }
    }
    console.log(
      "Array after removed is:",
      this.array,
      "service:",
      this.preflectService.get_Pref_Lect()
    );
  }
}
