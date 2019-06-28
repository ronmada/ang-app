import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { GaResultsComponent } from "./Components/ga-results/ga-results.component";
import { Step1Component } from "./Components/step1/step1.component";
import { Step2Component } from "./Components/step2/step2.component";
import { Step3Component } from "./Components/step3/step3.component";
import { Step4Component } from "./Components/step4/step4.component";
import { CanActivate } from "@angular/router";

const routes: Routes = [
  { path: "step-1", component: Step1Component },
  { path: "", redirectTo: "step-1", pathMatch: "full" },
  { path: "step-2", component: Step2Component },
  {
    path: "ga-results",
    component: GaResultsComponent,
    runGuardsAndResolvers: "always"
  },
  { path: "step-3", component: Step3Component },
  { path: "step-4", component: Step4Component },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  Step1Component,
  Step2Component,
  GaResultsComponent,
  PageNotFoundComponent,
  Step3Component,
  Step4Component
];
