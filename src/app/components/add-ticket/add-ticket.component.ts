import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
  @Output() addTask = new EventEmitter();

  closeAddTicket() {
    this.addTask.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }
}
