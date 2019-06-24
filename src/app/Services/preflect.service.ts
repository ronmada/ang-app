import { Injectable } from "@angular/core";
import * as _ from "underscore";

@Injectable({
  providedIn: "root"
})
export class PreflectService {
  pref_lecturers: Array<any> = [];
  lect_importance: number = 3;
  lect_string: string = String(this.lect_importance);
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
  }
  remove_Pref_Lect_By_Removing_Course(single_course: any) {
    console.log("single_course", single_course);
    let index = 0;
    let tempsplicer: Array<any> = [];
    for (let lect_checker of this.pref_lecturers) {
      for (let lect_obj in lect_checker) {
        if (lect_obj === "id") {
          if (lect_checker[lect_obj] === single_course.__Course__.id) {
            tempsplicer.push(index);
          }
        }
      }
      index += 1;
    }

    while (tempsplicer.length) {
      this.pref_lecturers.splice(tempsplicer.pop(), 1);
    }

    console.log("pref_lecturers after removal", this.pref_lecturers);
  }
  remove_Pref_Lect_By_Removing_Cluster(cluster: Array<any>): void {
    console.log("cluster[index]", cluster);
    let index = 0;
    let tempsplicer: Array<any> = [];
    for (let course of cluster) {
      console.log("COURSE", course);
      for (let lect_checker of this.pref_lecturers) {
        for (let lect_obj in lect_checker) {
          if (lect_obj === "id") {
            if (lect_checker[lect_obj] === course.__Course__.id) {
              console.log("MATCH:   ", course.__Course__.id);
              tempsplicer.push(index);
              console.log("index is:", index);
            }
          }
        }
        index += 1;
      }
      while (tempsplicer.length) {
        this.pref_lecturers.splice(tempsplicer.pop(), 1);
      }
      index = 0;
    }
    console.log("pref_lecturers after removal", this.pref_lecturers);
  }
}
