import { Component , OnInit } from '@angular/core';
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

  async onSubmit() {

    this.courseService.submitGA(this.struct)
    .then(
      ga_result => {
        this.courseService.putGAresults(ga_result)
        console.log('GA_RESULT: ' , ga_result)
        console.log('GA_RESULT2: ' , ga_result.classes[0])
      })


  //this.ga_result = this.courseService.submitGA(this.struct)
  //console.log('GA_RESULT: ' , this.ga_result)
  }
}
