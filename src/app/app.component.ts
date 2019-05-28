import { Component , OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Struct } from "./models/Struct";
import { CourseService } from './Services/course.service';


export type EditorType = 'name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'ang-app-test';
  editor: EditorType = 'name';

  constructor(public courseService: CourseService) { }

  ngOnInit(){
    this.courseService.get__all_courses()
  }
  get showNameEditor() {
    return this.editor === 'name';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
    console.log( 'structDB' , this.courseService.structDB.course_arr)
  }


}
