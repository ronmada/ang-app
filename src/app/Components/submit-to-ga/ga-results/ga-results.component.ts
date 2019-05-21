import { Component, OnInit , Input } from '@angular/core';
import { CourseService } from '../../../Services/course.service';

@Component({
  selector: 'app-ga-results',
  templateUrl: './ga-results.component.html',
  styleUrls: ['./ga-results.component.css']
})
export class GaResultsComponent implements OnInit {
  @Input() showMe: boolean
  ga_result : any

  constructor(private courseService:CourseService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.showGA()
  }
  showGA(){
    this.ga_result = (this.courseService.getGAresults())
    console.log("Show GA :" , this.ga_result)
  }

}
