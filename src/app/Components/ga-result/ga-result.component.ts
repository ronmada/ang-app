import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../Services/course.service"
import { GAresult } from '../../models/GAresult';

@Component({
  selector: 'app-ga-result',
  templateUrl: './ga-result.component.html',
  styleUrls: ['./ga-result.component.css']
})
export class GaResultComponent implements OnInit {
  ga_result : GAresult

  constructor(private courseService : CourseService) { }

  ngOnInit() {
    this.ga_result = this.courseService.getGAresults()
  }

}
