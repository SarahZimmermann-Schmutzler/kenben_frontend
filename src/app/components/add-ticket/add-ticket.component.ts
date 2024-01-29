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
  checkbox_low = false;
  checkbox_middle = false;
  checkbox_high = false;
  new_prio = '';
  isDisabledLow = false;
  isDisabledMiddle = false;
  isDisabledHigh = false;
  formControl = true;
  userNames: any = [];
  isChecked = false;


  ngOnInit() {
    this.watchForm();
  }

  createTicket() {
    console.log(this.new_title);
    console.log(this.new_description);
    console.log(this.new_prio);
    console.log(this.userNames);
  }

  watchForm() {
    setInterval(() => {
      if(this.new_prio != '' && this.new_title != '') {
        this.formControl = false;
      }
    }, 1000);
  }

  getUserValue(userName, i) {
    // let assigned = document.getElementById(`assigned-${i}`);
    // console.log('assigned', assigned)
   
    if(this.isChecked[i] == true) {
      this.userNames.push(userName);
    }

    if(this.isChecked[i] == false) {
      this.userNames.pop(userName);
    }
    
    console.log('username is', this.userNames);
  }

  // get the Value of the Prio --> better: use radiobuttons instead of checkboxes (no multiple selection by default)
  getPrioValue() {
    if (this.checkbox_low == true && this.checkbox_middle == false && this.checkbox_high == false) {
      this.setPrioLow();
    }

    if (this.checkbox_low == false && this.checkbox_middle == false && this.checkbox_high == false) {
      this.activateMiddleAndHigh();
      this.unsetNewPrio();
    }

    if (this.checkbox_middle == true && this.checkbox_low == false && this.checkbox_high == false) {
      this.setPrioMiddle();
    }

    if (this.checkbox_middle == false && this.checkbox_low == false && this.checkbox_high == false) {
      this.activateLowAndHigh();
      this.unsetNewPrio();
    }

    if (this.checkbox_high == true && this.checkbox_middle == false && this.checkbox_low == false) {
      this.setPrioHigh();
    }

    if (this.checkbox_high == false && this.checkbox_middle == false && this.checkbox_low == false) {
      this.activateMiddleAndLow();
      this.unsetNewPrio();
    }

    console.log(this.new_prio)
  }

  setPrioLow() {
    this.new_prio = 'low';
    this.isDisabledMiddle = true;
    this.isDisabledHigh = true;
  }

  setPrioMiddle() {
    this.new_prio = 'middle';
    this.isDisabledLow = true;
    this.isDisabledHigh = true;
  }

  setPrioHigh() {
    this.new_prio = 'high';
    this.isDisabledLow = true;
    this.isDisabledMiddle = true;
  }

  activateMiddleAndHigh() {
    this.isDisabledMiddle = false;
    this.isDisabledHigh = false;
  }

  activateLowAndHigh() {
    this.isDisabledLow = false;
    this.isDisabledHigh = false;
  }

  activateMiddleAndLow() {
    this.isDisabledLow = false;
    this.isDisabledMiddle = false;
  }

  unsetNewPrio() {
    this.new_prio='';
  }

  closeAddTicket() {
    this.addTask.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }
}
