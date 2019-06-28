import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { CourseService } from "../../Services/course.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-ga-results",
  templateUrl: "./ga-results.component.html",
  styleUrls: ["./ga-results.component.css"]
})
export class GaResultsComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ["0", "1", "2", "3", "4", "hour"];
  test = [];
  dataSource1 = new MatTableDataSource(this.test);
  dataSource2 = new MatTableDataSource(this.test);
  dataSource3 = new MatTableDataSource(this.test);
  ga_ready: boolean = false;

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnChanges() {
    console.log("Changes");
    this.ngOnInit();
  }
  ngOnInit() {
    console.log("started on init of ga result");
    var res_counter = 0;
    var one = new MatTableDataSource(this.test);
    var two = new MatTableDataSource(this.test);
    var three = new MatTableDataSource(this.test);
    var gas = this.courseService.getGAresults();
    console.log("gas", gas);
    gas.results.forEach(function(ga_json) {
      // var cos = this.courseService
      var rows = new Array();
      for (var hour = 0; hour < 13; hour++) {
        var row_hour = hour + 8;
        var start_min = 30;
        var end_min = 30;
        if (row_hour == 11) {
          start_min = 30;
          end_min = 20;
        }
        if (row_hour >= 12) {
          start_min = 50;
          end_min = 50;
        }
        var row = [
          "",
          "",
          "",
          "",
          "",
          "" +
            row_hour +
            ":" +
            start_min +
            " - " +
            (row_hour + 1) +
            ":" +
            end_min
        ];
        ga_json.classes.forEach(function(clas) {
          clas.lectures.forEach(function(lect) {
            if (lect.Start_time - 8 <= hour && lect.End_time - 8 > hour) {
              row[4 - lect.Day] =
                row[4 - lect.Day] +
                " " +
                clas.c_ID +
                " " +
                clas.Class_type +
                " " +
                lect.Lecturer_name;
            }
          });
        });
        rows.push(row);
      }
      if (res_counter == 0) one = new MatTableDataSource(rows);
      if (res_counter == 1) two = new MatTableDataSource(rows);
      if (res_counter == 2) three = new MatTableDataSource(rows);
      res_counter++;
    });
    this.dataSource1 = one;
    this.dataSource2 = two;
    this.dataSource3 = three;
  }
}
