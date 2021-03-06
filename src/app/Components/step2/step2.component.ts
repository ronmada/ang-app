import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { PreflectService } from "../../Services/preflect.service";
import { Router } from "@angular/router";
import { Struct } from "../../models/Struct";
import { FormControl } from "@angular/forms";

import * as _ from "underscore";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"]
})
export class Step2Component implements OnInit {
  class_Type_control = new FormControl();
  pref_lect_control = new FormControl();
  show_class_type: boolean = false;
  show_lecturer: boolean = false;
  array: Array<any> = [];
  course_chosen: boolean = false;
  class_type_chosen: boolean = false;
  nones: string = "None";
  class_type: string = "";
  lecturers: Array<any>;
  selected_course: object;
  classes: Set<string>;
  chosen_course: any[] = [];
  names: any[] = [
    { lab: Set, value: "lab", disabled: 1, r_value: "lab" },
    { practice: Set, value: "Practice", disabled: 1, r_value: "practice" },
    { lecture: Set, value: "Lecture", disabled: 1, r_value: "lecture" },
    { q_and_a: Set, value: "q_a", disabled: 1, r_value: "q_and_a" }
  ];
  struct: Struct;
  constructor(
    public courseService: CourseService,
    public preflectService: PreflectService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.check_for_courses()) {
      this.struct = this.courseService.getstruct();
      this.array = this.preflectService.get_Pref_Lect();
    }
  }
  check_for_courses() {
    if (
      !(
        this.courseService.struct.courses.length ||
        this.courseService.struct.clusters.length
      )
    ) {
      console.log("No Courses");
      this.router.navigate(["/step-1"]);
      return false;
    }
    return true;
  }
  resetItems(course: object) {
    this.lecturers = new Array();
    this.names[0].lab = new Set();
    for (let i = 0; i < this.names.length; i++) this.names[i].disabled = 1;
    this.names[1].practice = new Set();
    this.names[2].lecture = new Set();
    this.names[3].q_and_a = new Set();
    this.classes = new Set();
    this.selected_course = course;
    this.course_chosen = true;
    this.class_type_chosen = false;
    this.show_class_type = false;
  }
  onSelectCourse(course: any) {
    this.resetItems(course);
    let course_group: object[] = [];
    for (let group of course.__Course__.groups) {
      course_group.push(group);
    }
    this.chosen_course = course_group;
    this.check_course_types(this.chosen_course);
  }

  check_course_types(course: Array<any>) {
    for (let cor of course) {
      if (cor.__Course_Group__.lectures.length > 0) {
        this.classes.add("Lecture");
        this.names[2].disabled = 0;
        for (let co of cor.__Course_Group__.lectures) {
          for (let c of co.__Kita__.lectures) {
            this.names[2].lecture.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.practices.length > 0) {
        this.classes.add("Practice");
        this.names[1].disabled = 0;
        for (let co of cor.__Course_Group__.practices) {
          for (let c of co.__Kita__.lectures) {
            this.names[1].practice.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.q_and_as.length > 0) {
        this.classes.add("q_a");
        this.names[3].disabled = 0;
        for (let co of cor.__Course_Group__.q_and_as) {
          for (let c of co.__Kita__.lectures) {
            this.names[3].q_and_a.add(c.__Lect__.lecturer);
          }
        }
      }
      if (cor.__Course_Group__.labs.length > 0) {
        this.classes.add("lab");
        this.names[0].disabled = 0;
        for (let co of cor.__Course_Group__.labs) {
          for (let c of co.__Kita__.lectures) {
            this.names[0].lab.add(c.__Lect__.lecturer);
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
    this.class_type_chosen = true;
    this.show_class_type = true;
    this.show_lecturer = false;
  }
  onSelectLecturer(lecturer: string, class_type: string, course_id: string) {
    this.show_class_type = true;
    this.show_lecturer = true;

    let obj = {
      id: course_id,
      classtype: class_type,
      lecturer: lecturer
    };

    this.check_chosen_lect(obj);
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
      if (obj.id == checker.id && obj.classtype == checker.classtype) {
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
  onSelectImportance(val: string) {
    let value = Number(val);
    this.preflectService.set_importance(value);
  }
  remove_preflect_fromlist(index: number) {
    this.array.splice(index, 1);
    this.show_class_type = false;
    this.show_lecturer = false;
  }
  next_step() {
    this.router.navigate(["/step-3"]);
  }
}
