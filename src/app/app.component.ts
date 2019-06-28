import { Component, OnInit } from "@angular/core";
import { CourseService } from "./Services/course.service";
import { Router, ActivatedRoute } from "@angular/router";

export type EditorType = "name";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "InfoPlus+";
  ga_results_path: string = "/ga-results";
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("Server running on IP: ", this.courseService.ROOT_URL_local);
    this.courseService.get__all_courses();
  }

  async onSubmitGA() {
    this.courseService.ga_processing = true;
    this.courseService.hide_content=true
    await this.courseService.submitGA(this.courseService.getstruct());
    this.courseService.hide_content=false
    console.log("transition");
    if (this.router.url === "/ga-results") {
      this.router.navigate(["/step-1"]);
      this.router.navigate(["/ga-results"]);
    } else {
      this.router.navigate(["/ga-results"]);
    }
  }
}
