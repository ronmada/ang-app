import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Struct } from "../models/Struct";

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  course : Struct

  constructor(private http:HttpClient) { }

  getCourse() {
    return this.course
  }


}
