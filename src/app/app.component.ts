import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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
  courses: any;
  bb : any;
  editor: EditorType = 'name';

  get showNameEditor() {
    return this.editor === 'name';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }

 /*
  constructor (private http: HttpClient) {}

  getAllCors(){
    //this.posts = this.http.get(this.ROOT_URL + '/posts')
    this.courses = this.http.get(this.ROOT_URL_local + '/getallcor')
  }

  getOneCourse(){
    var courseid= 11004
    this.bb = this.http.get(this.ROOT_URL_local + '/getcorjs?courseid=11005')
    //var result = JSON.parse(this.bb);
    //console.log(result.__Course__)
  }

  testor(){
    //this.posts = this.http.get(this.ROOT_URL + '/posts')
    //this.tt = this.http.get(this.ROOT_URL_local + '/testy')
  }
  testconnection(){
    //this.tt = this.http.get(this.ROOT_URL + '/testy')
    //console.log(this.tt.item)
  }
  testconnectionlocal(){
    this.courses = this.http.get(this.ROOT_URL_local + '/testy')
    //console.log(this.oili.item)
  }
  getacourse(valuess){
    console.log(valuess)
  }
*/
}
