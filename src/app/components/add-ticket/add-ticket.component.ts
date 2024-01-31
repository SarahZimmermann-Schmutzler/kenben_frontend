import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
  @Output() addTask = new EventEmitter();
  @Input() allUsers = 'allUsers';
  @Input() boardId = 'boardId';
  new_title = '';
  new_description = '';
  new_dueDate = '';
  new_prio = '';
  formControl = true;
  assigned_to: any = [];
  user;
  newTickets = [];

  constructor( public ticketsService: TicketsService, private router: Router) {}

  ngOnInit() {
    this.watchForm();
  }


  watchForm() {
    setInterval(() => {
      if (this.new_prio != '' && this.new_title != '' && this.assigned_to != '' && this.new_dueDate != '') {
        this.formControl = false;
      }
    }, 1000);
  }


  getAssignedValue(user, i, event) {
    if (event.target.checked == true) {
      this.assigned_to.push(user.id);
    }

    if (event.target.checked == false) {
      this.assigned_to.splice(i, 1);
    }
  }


  getPrioValue(event) {
    if (event.target.checked == true) {
      this.new_prio = event.target.value;
    }
  }

  async createTicket() {
    try {
      let resp = await this.ticketsService.createTicket(
        this.new_title, 
        this.new_description, 
        this.assigned_to,
        this.new_prio,
        this.new_dueDate,
        this.boardId
      );
      // sendet title an backend
      // empfängt als response das neue board als Array
      // console.log(resp);
      this.getBack();
    } catch (e) {
      console.error(e);
    }
  }

  getBack() {
    this.router.navigateByUrl('/currentBoard').then(() => {
      window.location.reload();
    });
  }

  closeAddTicket() {
    this.addTask.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }
}
