import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './Components/add-course/add-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameEditorComponent } from './junk/name-editor/name-editor.component';
import { AddSelfMadeComponent } from './Components/add-self-made/add-self-made.component';
import { SubmitToGAComponent } from './Components/submit-to-ga/submit-to-ga.component';
import {CourseService} from './Services/course.service';
import { GaResultComponent } from './Components/ga-result/ga-result.component'

@NgModule({
  declarations: [
    AppComponent,
    NameEditorComponent,
    AddCourseComponent,
    AddSelfMadeComponent,
    SubmitToGAComponent,
    GaResultComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
