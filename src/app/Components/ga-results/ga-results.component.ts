import { Component, OnInit , Input } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { GAresult } from "../../models/GAresult";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ga-results',
  templateUrl: './ga-results.component.html',
  styleUrls: ['./ga-results.component.css']
})
export class GaResultsComponent implements OnInit {
  ga_result : any
  ga : GAresult
  @Input() ga_ready : boolean = false

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

  }
  /*showGA(){
    this.ga_result = (this.courseService.getGAresults())
    console.log("Show GA :" , this.ga_result)
    this.fill_ga_model()
  }*/
  fill_ga_model(){
    console.log("what's this?" , this.ga_result.classes[0]['c ID'])
  }
}
