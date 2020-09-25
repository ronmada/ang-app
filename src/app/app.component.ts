import { Component, OnInit } from "@angular/core";
import { CourseService } from "./Services/course.service";
import { Router } from "@angular/router";
import { environment } from './../environments/environment';
export type EditorType = "name";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "InfoPlus+";
  ga_results_path: string = "/ga-results";
  private _URL : string
  constructor(public courseService: CourseService, private router: Router) {
    this._URL = environment._URL;

  }

  ngOnInit() {
    console.log("Server running on IP: ", this._URL);
    this.courseService.get__all_courses();
  }

  async onSubmitGA() {
    await this.courseService.submitGA(this.courseService.getstruct());
    console.log("transition");
    this.router.navigate(["/ga-results"]);
  }
}
