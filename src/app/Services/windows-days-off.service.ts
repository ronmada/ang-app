import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WindowsDaysOffService {
  windows_importance: number = 2;
  windows_string: string = String(this.windows_importance);
  days_off_importance: number = 8;
  days_off_string: string = String(this.days_off_importance);
  constructor() {}

  set_windows_importance(importance: number) {
    this.windows_importance = importance;
    this.windows_string = String(importance);
    console.log("windows importance:", this.windows_importance);
  }

  set_daysoff_importance(importance: number) {
    this.days_off_importance = importance;
    this.days_off_string = String(importance);
    console.log("daysoff importance:", this.days_off_importance);
  }
}
