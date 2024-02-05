import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubtasksService } from 'src/app/services/subtasks.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})

export class EditTicketComponent {
  @Output() editView = new EventEmitter();
  @Output() addSubtask = new EventEmitter();
  @Input() ticketId;
  @Input() boardId;
  @Input() allUsers = 'allUsers';
  currentTicket: any = '';
  allSubtasks: any = [];
  subtasks: any = [];
  newSubtaskFields:any = [];
  new_subtask_title = '';
  subtask_input;

  new_ticket_title = '';
  new_ticket_description = '';
  new_ticket_dueDate = '';
  new_ticket_prio = '';
  new_ticket_assigned: any = [];
  formControl = true;
  

  async ngOnInit() {
    this.currentTicket = await this.ticketsService.loadCurrentTicket(this.ticketId);
    console.log(this.currentTicket);
    this.allSubtasks = await this.subtaskService.loadSubtasks();
    console.log(this.allSubtasks);
    this.filterSubtasks();
    this.watchForm();
  }

  constructor(
    public ticketsService: TicketsService,
    public subtaskService: SubtasksService,
    private router: Router,
  ) { }

  watchForm() {
    setInterval(() => {
      if (this.new_ticket_prio != '' || this.new_ticket_title != '' || this.new_ticket_assigned != '' || this.new_ticket_dueDate != '') {
        this.formControl = false;
      }
    }, 1000);
  }

  filterSubtasks() {
    this.subtasks = this.allSubtasks.filter(s => s.tickets == this.ticketId);
    console.log(this.subtasks);
  }

  getBack() {
    this.router.navigateByUrl('/currentBoard').then(() => {
      window.location.reload();
    });
  }

  closeEditView() {
    this.editView.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }

 

  async editTicket() {
    console.log('hallo', this.new_ticket_prio);
    try {
      let resp = await this.ticketsService.editTicket(
        this.ticketId,
        this.new_ticket_title,
        this.new_ticket_description,
        this.new_ticket_assigned,
        this.new_ticket_prio,
        this.new_ticket_dueDate,
        this.boardId
      );
      // sendet title an backend
      // empfängt als response das neue board als Array
      console.log(resp);
      // this.getBack();
    } catch (e) {
      console.error(e);
    }
  }


  openAddSubtask() {
    this.addSubtask.emit(true);
  }

  getPrioValue(event) {
    if (event.target.checked == true) {
      this.new_ticket_prio = event.target.value;
    }
  }

  getAssignedValue(user, i, event) {
    if (event.target.checked == true) {
      this.new_ticket_assigned.push(user.id);
    }

    if (event.target.checked == false) {
      this.new_ticket_assigned.splice(i, 1);
    }
  }

}
