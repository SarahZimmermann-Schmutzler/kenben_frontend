import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
  @Output() addTask = new EventEmitter();
  @Input() allUsers = 'allUsers';
  new_title = '';
  new_description = '';
  new_dueDate = '';
  new_prio = '';
  formControl = true;
  userNames: any = [];
  user;


  ngOnInit() {
    this.watchForm();
  }


  createTicket() {
    console.log(this.new_title);
    console.log(this.new_description);
    console.log(this.new_prio);
    console.log(this.userNames);
    console.log(this.new_dueDate);
  }


  watchForm() {
    setInterval(() => {
      if (this.new_prio != '' && this.new_title != '' && this.userNames != '' && this.new_dueDate != '') {
        this.formControl = false;
      }
    }, 1000);
  }


  getAssignedValue(user, i, event) {
    if (event.target.checked == true) {
      this.userNames.push(user.username);
    }

    if (event.target.checked == false) {
      this.userNames.splice(i, 1);
    }
  }


  getPrioValue(event) {
    if (event.target.checked == true) {
      this.new_prio = event.target.value;
    }
  }


  closeAddTicket() {
    this.addTask.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }
}
