import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GaResultsComponent } from './Components/ga-results/ga-results.component';
import { Step1Component } from './Components/step1/step1.component';
import { Step2Component } from './Components/step2/step2.component';

const routes: Routes = [
  //{ path: 'courses' , component: AddCourseComponent},
  //{ path: 'selfmadecourses' , component: AddSelfMadeComponent},
  { path : 'step-1' , component: Step1Component},
  { path: '',   redirectTo: 'step-1', pathMatch: 'full' },
  { path : 'step-2' , component: Step2Component},
  { path : 'ga-results' , component: GaResultsComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [Step1Component , Step2Component , GaResultsComponent  , PageNotFoundComponent]
