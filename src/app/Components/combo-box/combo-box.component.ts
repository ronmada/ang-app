import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "../../Services/course.service";

@Component({
  selector: "app-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.css"]
})
export class ComboBoxComponent implements OnInit {
  options: string[] = ["ID", "Name"];
  chosen: string = "ID";
  select_option: string = "ID";
  @Input() list: any = [];
  @Input() type_of_search: string;

  // two way binding for input text
  inputItem: string = "";
  // enable or disable visiblility of dropdown
  listHidden = true;
  @Input() showError = false;
  errorMsg: string[] = [];
  selectedIndex = -1;
  // the list to be shown after filtering
  filteredList: any[];

  constructor(public courseService: CourseService) {}

  ngOnInit() {
    this.filteredList = this.list;
  }
  handleChange(option: string) {
    // this.showError = false;
    this.select_option = option;
    console.log("changed to search by:", this.select_option);
    if (this.select_option === "ID") {
      this.list = this.courseService.courseitem_ID;
    } else if (this.select_option === "Name") {
      this.list = this.courseService.courseitem_Name;
    }
  }

  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter(item =>
        item.startsWith(this.inputItem)
      );
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind: number) {
    this.inputItem = this.filteredList[ind];
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  // navigate through the list of items
  onKeyPress(event: any) {
    this.showError = false;
    if (!this.listHidden) {
      if (event.key === "Escape") {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === "Enter") {
        this.toggleListDisplay(0);
      }
      if (event.key === "ArrowDown") {
        this.listHidden = false;
        this.selectedIndex =
          (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName("list-item")
            [this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === "ArrowUp") {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex =
          (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName("list-item")
            [this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    let dup_check: boolean = true;
    if (sender === 1) {
      this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        if (this.selectedIndex !== -1) {
          if (this.type_of_search === "single") {
            dup_check = this.courseService.add_singl_cor_to_struct(
              this.inputItem
            );
          } else if (this.type_of_search === "cluster") {
            console.log("adding course to cluster temp group");
            dup_check = this.courseService.add_single_course_to_cluster_struct(
              this.inputItem
            );
          }
        }
        if (!dup_check) {
          console.log("Show Error", this.courseService.check);
          this.showError = true;
          this.errorMsg = this.courseService.check;
        } else {
          this.showError = false;
        }
        this.courseService.check = [];
        this.inputItem = undefined;
        this.listHidden = true;
        this.filteredList = this.list;
      }, 100);
    }
  }
}
