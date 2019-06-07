import { Component , OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Struct } from "./models/Struct";
import { CourseService } from './Services/course.service';
import { Router, ActivatedRoute } from "@angular/router";


export type EditorType = 'name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'ang-app-test';
  editor: EditorType = 'name';
  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

   ngOnInit(){
    console.log("Server running on IP: " , this.courseService.ROOT_URL_local)

    this.courseService.get__all_courses()
  }
  get showNameEditor() {
    return this.editor === 'name';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
  async onSubmitGA() {
    await this.courseService.submitGA(this.courseService.getstruct());
    console.log('transition')
    this.router.navigate(["/ga-results"]);
  }

}
