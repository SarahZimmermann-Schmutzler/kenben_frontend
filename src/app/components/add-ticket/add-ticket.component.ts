import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
  @Output() addTask = new EventEmitter();
  new_title = '';
  new_description = '';
  checkbox_low = false;
  checkbox_middle = false;
  checkbox_high = false;
  prio_low = '';
  prio_middle = '';
  prio_high = '';
  isDisabled = false;

 ngOnInit() {
  
 }

  createTicket() {
    this.getPrioValue();

    console.log(this.new_title);
    console.log(this.new_description);
    console.log(this.prio_low);
    console.log(this.prio_middle);
    console.log(this.prio_high);
  }

  disableCheckbox() {
    this.isDisabled = true;
  }

  getPrioValue() {
    if(this.checkbox_low == true) {
      this.prio_low = 'low';
    }

    if(this.checkbox_middle == true) {
      this.prio_middle = 'middle';
    }

    if(this.checkbox_high == true) {
      this.prio_high = 'high';
    }
  }

  closeAddTicket() {
    this.addTask.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }
}
