import { Component , OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Struct } from "../../models/Struct";
import { CourseService } from '../../Services/course.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-submit-to-ga',
  templateUrl: './submit-to-ga.component.html',
  styleUrls: ['./submit-to-ga.component.css']
})
export class SubmitToGAComponent implements OnInit{
  struct : Struct
  aform = this.fb.group({
  })

  constructor(private courseService:CourseService , private fb: FormBuilder) { }

  ngOnInit() {
    this.struct = this.courseService.getstruct()
  }

  onSubmit() {
  this.courseService.submitGA(this.struct)
  }
}
