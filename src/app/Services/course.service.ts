import { Injectable, OnInit, Input } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Struct } from "../models/Struct";
import { GAresult } from "../models/GAresult";
import "rxjs/add/operator/toPromise";

@Injectable({
  providedIn: "root"
})
export class CourseService implements OnInit {
  editor: String = "single";
  search_option: string = "ID";
  smgroup: any[] = [];
  group_submit_button_booly: boolean = false;
  cluster_show_booly: boolean[] = [];
  struct: Struct;
  finished_fetch_booly: boolean = false;
  courseDB: any[] = [];
  clicked_was_set: boolean = false;
  ga_result: any;
  course_id_name: any[] = [];
  courseitem_ID: any[] = [];
  courseitem_Name: any[] = [];
  ga: GAresult;
  ga_ready: boolean = false;
  clicked: boolean[] = new Array(64);
  //readonly ROOT_URL_local = 'http://127.0.0.1:5000'
  readonly ROOT_URL_local = "https://infoplus.azurewebsites.net";
  readonly ROOT_URL = "https://infoplus.azurewebsites.net";

  constructor(private http: HttpClient) {
    this.struct = new Struct();
    this.ga = new GAresult();
  }

  ngOnInit() {
    for (var i = 0; i < this.clicked.length; i++) {
      this.clicked[i] = false;
    }
  }
  send_search_option(id, name) {
    console.log("option ID:", id);
    this.courseitem_ID = id;
    this.courseitem_Name = name;
  }
  define_editor(editor) {
    this.editor = editor;
  }
  remove_cluster_from_list(index) {
    this.struct.clusters.splice(index, 1);
    this.cluster_show_booly.pop();
  }
  add_singl_cor_to_struct(single_course) {
    console.log("the single course:", single_course);
    let result = this.search_Course(single_course);
    this.struct.courses.push(result);
  }

  search_Course(single_course) {
    if (!isNaN(single_course.split(" ", 1)[0])) {
      single_course = single_course.split(" ", 1)[0];
      let result = this.courseDB.filter(
        courseIter => courseIter.__Course__.id == single_course
      )[0];
      return result;
    } else {
      single_course = single_course.slice(-5);
      let result = this.courseDB.filter(
        courseIter => courseIter.__Course__.id == single_course
      )[0];
      return result;
    }
  }

  add_single_course_to_cluster_struct(item) {
    let result = this.search_Course(item);
    this.smgroup.push(result);
    this.group_submit_button_booly = true;
    console.log("smgroup looks like this: ", this.smgroup);
  }

  add_cluster_to_struct() {
    //push the current cluster to the clusters
    console.log("smgroup looks like this just before post: ", this.smgroup);
    this.struct.clusters.push(this.smgroup);
    console.log("clusters looks like this:", this.struct.clusters);
    this.cluster_show_booly.push(false);
    //empty current cluster
    this.smgroup = [];
    this.group_submit_button_booly = false;
  }

  setSearch_Option(option) {
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

  get_window(id) {
    return this.clicked[id];
  }
  set_window(id) {
    this.clicked[id] = !this.clicked[id];
  }
  set_window_bool(id, bool) {
    this.clicked[id] = bool;
  }

  getstruct() {
    return this.struct;
  }

  async get__all_courses() {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(this.ROOT_URL_local + "/getallcor")
        .toPromise()
        .then(
          res => {
            // Success
            Array.prototype.push.apply(this.courseDB, res);
            console.log("all courses: ", this.courseDB);
            this.fill_course_id_name();
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
    await promise;
  setTimeout(() => {
    this.finished_fetch_booly = true;
    }, 500);
    // return this.course_id_name


  }

  fill_course_id_name() {
    for (let course_arr of this.courseDB) {
      this.course_id_name.push({
        id: course_arr.__Course__.id,
        course_name: course_arr.__Course__.course_name
      });
    }
  }




  async getoneCourse(courseid) {
    let courseres: any;
    let promise = new Promise((resolve, reject) => {
      let params = new HttpParams().set("courseid", courseid);
      this.http
        .get(this.ROOT_URL_local + "/getcorjs", { params })
        .toPromise()
        .then(
          res => {
            // Success
            courseres = res;
            console.log("course object to be inserted: ", courseres);
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
    await promise;
    return courseres;
  }

  get_ga_ready() {
    return this.ga_ready;
  }

  getGAresults() {
    console.log("returner:", this.ga_result);
    return this.ga_result;
  }
  putGAresult(garesult) {
    this.ga_result = garesult;
    console.log("PUTGARESULT", this.ga_result);
  }

  async submitGA(struct: Struct) {
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
    console.log("array of clicked ", this.clicked);
    console.log("clusters:", params.getAll("cluster"));
    console.log("single courses", params.getAll("courses"));

    console.log("specific_windows", params.getAll("specific_windows"));
    console.log("specific_days_off", params.getAll("specific_days_off"));
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(this.ROOT_URL_local + "/start_ga", { params })
        .toPromise()
        .then(res => {
          // Success
          this.putGAresult(res);
          resolve();
        });
    });
    await promise;
    console.log("ga_result 0:  ", this.getGAresults());
    console.log("ga_result 1 :  ", this.ga_result);
    console.log("Struct looks like this after submit:  ", this.struct);
    //console.log(someresult)
    //console.log(someresult.classes[1]["Class type"])
    this.ga_ready = true;
  }

  remove_single_Course(index) {
    this.struct.courses.splice(index, 1);
  }

  remove_one_course_from_cluster(index, course) {
    this.struct.clusters[index].splice(course, 1);
    if (!this.struct.clusters[index].length) {
      this.cluster_show_booly.pop();
      this.struct.clusters.splice(index, 1);
    }
  }
  remove_temp_course_from_cluster(index) {
    this.smgroup.splice(index, 1);
    if (!this.smgroup.length) this.group_submit_button_booly = false;
  }
}
