import { Component, OnInit , Input } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { GAresult } from "../../models/GAresult";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ga-results',
  templateUrl: './ga-results.component.html',
  styleUrls: ['./ga-results.component.css']
})
export class GaResultsComponent implements OnInit {
  ga_result : any
  ga : GAresult
  displayedColumns  :  string[] = ['0', '1', '2', '3', '4','hour'];
  
  test = ['8:30','sagi','','sagiiii','sasa','a','']
  dataSource = new MatTableDataSource(this.test)
  @Input() ga_ready : boolean = false

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    var ga_json = this.courseService.getGAresults()
    var rows = new Array()
    for(var hour = 0 ; hour<13;hour++){
      var row_hour=hour+8
      var start_min = 30
      var end_min = 30
      if (row_hour == 11){
          start_min = 30
          end_min = 20
      }
      if (row_hour >= 12){
          start_min = 50
          end_min = 50
      }
      var row = ['','','','','',''+row_hour + ':' + start_min + ' - ' + (row_hour+1)+ ':' + end_min]
      ga_json.classes.forEach(function(clas) {
        clas.lectures.forEach(async function(lect) {

           if ((lect.Start_time -8) <= hour &&  (lect.End_time -8) > hour ){
            var c_name='no name'
            this.courseService.getoneCourse(clas.c_ID)
            .then(
              singleCourse => {
                c_name = singleCourse.course_name
              })
            row[4-lect.Day] = row[4-lect.Day] + ' ' + clas.c_ID + ' ' +' ' +' '+ clas.Class_type + ' ' + lect.Lecturer_name
          }
        });
      });
      rows.push(row)
    }
    this.dataSource = new MatTableDataSource(rows)
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
