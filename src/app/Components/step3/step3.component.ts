import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.css"]
})
export class Step3Component implements OnInit {
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.set_clicked_array_to_false();
  }

  clicked(id) {
    return this.courseService.get_window(id);
  }

  onclick(id) {
    this.courseService.set_window(id);
  }
  clickweek(day) {
    var all = false;
    for (var i = 0; i < 13; i++) {
      if (this.courseService.get_window(day * 13 + i) != false) all = true;
    }
    if (all == true) {
      for (var i = 0; i < 13; i++) {
        this.courseService.set_window_bool(day * 13 + i, false);
      }
      return;
    }

    for (var i = 0; i < 13; i++) {
      this.courseService.set_window_bool(day * 13 + i, true);
    }
  }
  next_step() {
    this.router.navigate(["/step-4"]);
  }
}
