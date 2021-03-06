import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Struct } from "../models/Struct";
import { PreflectService } from "./preflect.service";
import { WindowsDaysOffService } from "./windows-days-off.service";
import "rxjs/add/operator/toPromise";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class CourseService {
  hide_content: boolean = false;
  ga_processing: boolean = false;
  search_option: string = "ID";
  search_optio_cluster: string = "ID";
  check: string[] = [];
  smgroup: any[] = [];
  group_submit_button_booly: boolean = false;
  cluster_show_booly: boolean[] = [];
  struct: Struct;
  finished_fetch_booly: boolean = false;
  courseDB: any[] = [];
  clicked_was_set: boolean = false;
  ga_result: any;
  course_id_name: any[] = [];
  courseitem_ID: Array<string> = [];
  courseitem_Name: Array<string> = [];
  weight: number[] = [2, 8, 3];
  // weight = [specific_windows_weight,spesific_days_off_weight,specific_lecturers_weight]
  //[3,8,8] defult values
  //[6,16,16] high values
  ga_ready: boolean = false;
  clicked: boolean[] = new Array(64);
  //for local host>
  //readonly _URL = "http://127.0.0.1:5000";
  // _URL = "https://braudeinfoplus.azurewebsites.net";
  private _URL :string;
  constructor(
    private http: HttpClient,
    private preflectService: PreflectService,
    private windowsDaysOffService: WindowsDaysOffService,
  ) {
    this._URL = environment._URL;
    this.struct = new Struct();
    this.set_clicked_array_to_false();
  }

  send_search_option(id: Array<string>, name: Array<string>) {
    this.courseitem_ID = id;
    this.courseitem_Name = name;
  }

  add_singl_cor_to_struct(single_course: string) {
    let result = this.search_Course(single_course);
    if (result === 0) {
      return false;
    } else {
      this.struct.courses.push(result);
    }
    return true;
  }

  search_Course(single_course: any) {
    let result: string;
    if (!isNaN(single_course.split(" ", 1)[0])) {
      single_course = single_course.split(" ", 1)[0];
      result = this.courseDB.filter(
        courseIter => courseIter.__Course__.id == single_course
      )[0];
    } else {
      single_course = single_course.slice(-5);
      result = this.courseDB.filter(
        courseIter => courseIter.__Course__.id == single_course
      )[0];
    }
    this.check_duplicate(result);
    if (this.check.length === 0) {
      return result;
    } else {
      console.log("DUPLICATE", this.check);
      return 0;
    }
  }

  check_duplicate(result: string) {
    for (let iter of this.struct.courses) {
      if (result === iter) {
        console.log("duplicate found", result);
        this.check.push(result);
      }
    }
    for (let iter of this.struct.clusters) {
      for (let it of iter) {
        if (result === it) {
          console.log("duplicate found", result);
          this.check.push(result);
        }
      }
    }
    for (let iter of this.smgroup) {
      if (result === iter) {
        console.log("duplicate found", result);
        this.check.push(result);
      }
    }
  }

  add_single_course_to_cluster_struct(item: string) {
    let result = this.search_Course(item);
    if (result === 0) {
      return false;
    } else {
      this.smgroup.push(result);
      this.group_submit_button_booly = true;
      console.log("smgroup looks like this: ", this.smgroup);
    }
    return true;
  }

  add_cluster_to_struct() {
    //push the current cluster to the clusters
    this.struct.clusters.push(this.smgroup);
    console.log("clusters looks like this:", this.struct.clusters);
    this.cluster_show_booly.push(false);
    //empty current cluster
    this.smgroup = [];
    this.group_submit_button_booly = false;
  }

  setSearch_Option(option: string) {
    this.search_option = option;
  }

  set_clicked_array_to_false() {
    if (this.clicked_was_set == false) {
      for (var i = 0; i < this.clicked.length; i++) {
        this.clicked[i] = false;
      }
      this.clicked_was_set = true;
    }
  }

  get_window(id: number) {
    return this.clicked[id];
  }
  set_window(id: number) {
    this.clicked[id] = !this.clicked[id];
  }
  set_window_bool(id: number, bool: boolean) {
    this.clicked[id] = bool;
  }

  getstruct() {
    return this.struct;
  }

  async get__all_courses() {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(this._URL + "/getallcor")
        .toPromise()
        .then(
          res => {
            // Success
            Array.prototype.push.apply(this.courseDB, res);
            console.log("all courses: ", this.courseDB);
            this.fill_course_id_name();
            resolve();
          }
          // msg => {
          //   // Error
          //   reject(msg);
          // }
        )
        .catch(error => {
          console.log(error.message);
          this.finished_fetch_booly = true;
          alert(
            "An error has occured while fetching data from server, watch the console log for more information"
          );
        });
    });
    await promise;
    setTimeout(() => {
      this.finished_fetch_booly = true;
      console.log("Finished fetch data from server");
    }, 500);
  }

  fill_course_id_name() {
    for (let course_arr of this.courseDB) {
      this.course_id_name.push({
        id: course_arr.__Course__.id,
        course_name: course_arr.__Course__.course_name
      });
    }
  }

  getGAresults() {
    return this.ga_result;
  }
  putGAresult(garesult: any) {
    this.ga_result = garesult;
  }

  remove_single_Course(index: number) {
    this.preflectService.remove_Pref_Lect_By_Removing_Course(
      this.struct.courses[index]
    );
    this.struct.courses.splice(index, 1);
  }

  remove_one_course_from_cluster(index: number, course: number) {
    this.preflectService.remove_Pref_Lect_By_Removing_Course(
      this.struct.clusters[index][course]
    );
    this.struct.clusters[index].splice(course, 1);
    if (!this.struct.clusters[index].length) {
      this.cluster_show_booly.pop();
      this.struct.clusters.splice(index, 1);
    }
  }
  remove_temp_course_from_cluster(index: number) {
    this.smgroup.splice(index, 1);
    if (!this.smgroup.length) this.group_submit_button_booly = false;
  }
  remove_cluster_from_list(index: number) {
    this.preflectService.remove_Pref_Lect_By_Removing_Cluster(
      this.struct.clusters[index]
    );
    this.struct.clusters.splice(index, 1);
    this.cluster_show_booly.pop();
  }
  async submitGA(struct: Struct) {
    this.ga_processing = true;
    this.hide_content = true;
    let params = new HttpParams();
    for (let cluster of struct.clusters) {
      let clus = "";
      for (let course of cluster) {
        if (clus == "") {
          clus = clus + course.__Course__.id;
        } else {
          clus = clus + " " + course.__Course__.id;
        }
      }
      params = params.append("cluster", clus);
    }
    var daysoff = "";
    var windows = "";
    for (var i = 0; i < 5; i++) {
      var dayoff = true;
      for (var j = 0; j < 13; j++) {
        if (this.clicked[i * 13 + j] == false) dayoff = false;
      }
      if (dayoff == true) {
        if (daysoff == "") daysoff = daysoff + (4 - i);
        else daysoff = daysoff + " " + (4 - i);
      } else {
        for (var j = 0; j < 13; j++) {
          if (this.clicked[i * 13 + j] == true) {
            if (windows == "")
              windows = windows + "(" + (4 - i) + "," + j + ")";
            else windows = windows + " " + "(" + (4 - i) + "," + j + ")";
          }
        }
      }
    }
    let courses = "";
    for (let course of struct.courses) {
      if (courses == "") {
        courses = courses + course.__Course__.id;
      } else {
        courses = courses + " " + course.__Course__.id;
      }
    }
    if (courses != "") params = params.append("courses", courses);
    if (windows != "") params = params.append("specific_windows", windows);
    if (daysoff != "") params = params.append("specific_days_off", daysoff);
    this.weight[0] = this.windowsDaysOffService.windows_importance;
    this.weight[1] = this.windowsDaysOffService.days_off_importance;
    this.weight[2] = this.preflectService.lect_importance;
    params = params.append("specific_windows_weight", "" + this.weight[0]);
    params = params.append("specific_days_off_weight", "" + this.weight[1]);
    params = params.append("specific_lecturer_weight", "" + this.weight[2]);

    let pref_lecturers: Array<object> = this.preflectService.get_Pref_Lect();
    console.log("pref_lectures_array", pref_lecturers);

    if (pref_lecturers.length) {
      let lect_length: number = pref_lecturers.length - 1;
      for (let preflect_obj of pref_lecturers) {
        let full_lect_string: string = "";
        full_lect_string += "(";
        let count: number = 2;
        for (let preflect_string in preflect_obj) {
          if (count !== 0) {
            full_lect_string += preflect_obj[preflect_string] + ",";
            count -= 1;
          } else {
            full_lect_string += preflect_obj[preflect_string];
          }
        }
        if (lect_length !== 0) {
          full_lect_string += ")" + " ";
          lect_length -= 1;
        } else {
          full_lect_string += ")";
        }
        params = params.append("lecturer", full_lect_string);
      }
    }

    console.log("array of clicked ", this.clicked);
    console.log("clusters:", params.getAll("cluster"));
    console.log("single courses", params.getAll("courses"));
    console.log("Preferd lecturers", params.getAll("lecturer"));
    console.log("specific_windows", params.getAll("specific_windows"));
    console.log("specific_days_off", params.getAll("specific_days_off"));
    console.log(
      "specific_windows_weight courses",
      params.getAll("specific_windows_weight")
    );
    console.log(
      "single specific_days_off_weight",
      params.getAll("specific_days_off_weight")
    );
    console.log(
      "single specific_lecturer_weight",
      params.getAll("specific_lecturer_weight")
    );

    let promise = await new Promise((resolve, reject) => {
      this.http
        .get(this._URL + "/start_ga", { params })
        .toPromise()
        .then(res => {
          // Success
          this.putGAresult(res);
          resolve();
        })
        .catch(error => {
          console.log(error.message);
          this.ga_ready = true;
          this.ga_processing = false;
          this.hide_content = false;
          alert(
            "An error has occured, watch the console log for more information"
          );
        });
    });
    await promise;
    console.log("ga_result:  ", this.getGAresults());
    this.ga_ready = true;
    this.ga_processing = false;
    this.hide_content = false;
  }
}
