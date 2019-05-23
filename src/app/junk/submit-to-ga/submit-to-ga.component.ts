import { Component , OnInit, Input } from '@angular/core';
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
  ga_result : any
  @Input() show_ga : boolean = false
  aform = this.fb.group({
  })

  constructor(private courseService:CourseService , private fb: FormBuilder) { }

  ngOnInit() {
    this.struct = this.courseService.getstruct()
  }

   onSubmit() {
    this.courseService.submitGA(this.struct).then(
      garesult => {
        this.ga_result=garesult
        console.log('GA_RESULTje: ' , this.ga_result)
      })
  }

  
}
