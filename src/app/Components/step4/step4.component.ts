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
  step3: boolean = false;
  windowsPriority: Array<string> = ["2", "4"];
  constructor(
    public courseService: CourseService,
    public preflectService: PreflectService,
    public windowsDaysOffService: WindowsDaysOffService
  ) {}

  ngOnInit() {
    // console.log("STRUCT:",this.courseService.getstruct())
    this.check_for_windows();
  }
  onSelectLectImportance(val: string) {
    let value = Number(val);
    this.preflectService.set_importance(value);
  }
  check_for_windows() {
    let arrayCheck: Array<boolean> = this.courseService.clicked;
    for (let checker of arrayCheck) {
      if (checker === true) {
        this.step3 = true;
        break;
      }
    }
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
