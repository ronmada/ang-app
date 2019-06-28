import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { PreflectService } from "../../Services/preflect.service";
import { WindowsDaysOffService } from "../../Services/windows-days-off.service";

@Component({
  selector: "app-step4",
  templateUrl: "./step4.component.html",
  styleUrls: ["./step4.component.css"]
})
export class Step4Component implements OnInit {
  windows: boolean = false;
  days_off: boolean = false;

  constructor(
    public courseService: CourseService,
    public preflectService: PreflectService,
    public windowsDaysOffService: WindowsDaysOffService
  ) {}

  ngOnInit() {
    this.check_for_windows();
    this.check_for_daysoff();
  }
  check_for_windows() {
    for (let i = 0; i < 5; i++) {
      let dayoff = true;
      for (let j = 0; j < 13; j++) {
        if (this.courseService.clicked[i * 13 + j] === false) dayoff = false;
      }
      if (dayoff === false) {
        for (var j = 0; j < 13; j++) {
          if (this.courseService.clicked[i * 13 + j] === true) {
            this.windows = true;
            break;
          }
        }
      }
    }
  }
  check_for_daysoff() {
    for (let i = 0; i < 5; i++) {
      let dayoff = true;
      for (let j = 0; j < 13; j++) {
        if (this.courseService.clicked[i * 13 + j] === false) dayoff = false;
      }
      if (dayoff === true) this.days_off = true;
    }
  }
  onSelectLectImportance(val: string) {
    let value = Number(val);
    this.preflectService.set_importance(value);
  }

  onSelectWindowImportance(val: string) {
    let value = Number(val);
    this.windowsDaysOffService.set_windows_importance(value);
  }
  onSelectDaysoffImportance(val: string) {
    let value = Number(val);
    this.windowsDaysOffService.set_daysoff_importance(value);
  }
}
