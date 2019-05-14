import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-app-test';
  readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  readonly ROOT_URL = 'https://infopp.azurewebsites.net'
  //readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  courses: any;
  bb : any;
  constructor (private http: HttpClient) {}

  getAllCors(){
    //this.posts = this.http.get(this.ROOT_URL + '/posts')
    this.courses = this.http.get(this.ROOT_URL + '/getallcor')
  }

  getOneCourse(){
    var courseid= 11004
    this.bb = this.http.get(this.ROOT_URL + '/getcorjs?courseid=11005')
  }
}
