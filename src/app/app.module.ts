import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CourseService } from "./Services/course.service";
import { MatTableModule } from "@angular/material";
import { ComboBoxComponent } from "./Components/combo-box/combo-box.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material";
import { LoadScreenComponent } from "./Components/load-screen/load-screen.component";
import { MatSelectModule } from "@angular/material/select";
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ComboBoxComponent,
    LoadScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
