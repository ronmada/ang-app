import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PreflectService {
  pref_lecturers: Array<object> = [];
  lect_importance: number = 3;
  lect_string: string = "3";
  constructor() {}

  push_Pref_Lect(obj: object) {
    this.pref_lecturers.push(obj);
    console.log("pref_lecturers", this.pref_lecturers);
  }
  get_Pref_Lect() {
    return this.pref_lecturers;
  }
  switchLect(obj: object, index: number) {
    this.pref_lecturers[index] = obj;
  }
  removeSelectedPrefLect(index: number) {
    this.pref_lecturers.splice(index, 1);
  }
  get_importance() {
    return this.lect_importance;
  }
  set_importance(importance: number) {
    this.lect_importance = importance;
    this.lect_string = String(importance);
    console.log("importance:", this.lect_importance);
    // this.courseService.weight[2] = importance;
  }
}
