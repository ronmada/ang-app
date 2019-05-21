import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { Struct } from "./models/Struct";
import { CourseService } from './Services/course.service';


export type EditorType = 'name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-app-test';
  editor: EditorType = 'name';

  constructor(private courseService: CourseService) { }

  get showNameEditor() {
    return this.editor === 'name';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }


}
