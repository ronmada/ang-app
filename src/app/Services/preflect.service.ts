import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PreflectService {
  pref_lecturers: Array<object> = [];

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
}
