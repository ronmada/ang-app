import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Struct } from "./models/Struct";


export type EditorType = 'name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ang-app-test';
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  readonly ROOT_URL = 'https://infoplus.azurewebsites.net'
  //readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  editor: EditorType = 'name';

  constructor( private http: HttpClient) { }

  get showNameEditor() {
    return this.editor === 'name';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }


}
