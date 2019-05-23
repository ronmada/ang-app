import { Component , OnInit, Input } from '@angular/core';
import { Struct } from "../../models/Struct";
import { CourseService } from '../../Services/course.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    public courseService : CourseService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  ngOnInit() {
  }

}
