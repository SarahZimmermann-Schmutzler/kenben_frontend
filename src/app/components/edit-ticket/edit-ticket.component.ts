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
  newSubtaskFields: any = [];
  new_subtask_title = '';
  subtask_input;

  new_ticket_title = '';
  new_ticket_description = '';
  new_ticket_dueDate = '';
  new_ticket_prio = '';
  new_ticket_assigned: any = [];
  formControl = true;
  deleteDescription = false; 
  subtask_ckecked: boolean;


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
      if (this.new_ticket_prio != '' || this.new_ticket_title != '' || this.new_ticket_assigned != '' || this.new_ticket_dueDate != '' || this.new_ticket_description != '' || this.deleteDescription == true || this.subtask_ckecked == true || this.subtask_ckecked == false) {
        this.formControl = false;
      } else {
        this.formControl = true;
      }
    }, 500);
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
    try {
      if (this.new_ticket_title != this.currentTicket.title && this.new_ticket_title != '') {
        let resp_title = await this.ticketsService.editTitle(this.ticketId, this.new_ticket_title);
        console.log('this is the resp_title', resp_title);
      }

      if ((this.new_ticket_description != '' && this.currentTicket.description == '') || (this.new_ticket_description != '' && this.currentTicket.description != '')) {
        let resp_desc = await this.ticketsService.editDescription(this.ticketId, this.new_ticket_description);
        console.log('this is the resp_desc', resp_desc);
      }

      if (this.deleteDescription == true) {
        this.new_ticket_description = '';
        console.log(this.new_ticket_description)
        let resp_desc = await this.ticketsService.editDescription(this.ticketId, this.new_ticket_description);
        console.log('this is the resp_desc', resp_desc);
      }

      if (this.new_ticket_prio != this.currentTicket.priority && this.new_ticket_prio != '') {
        let resp_prio = await this.ticketsService.editPrio(this.ticketId, this.new_ticket_prio);
        console.log('this is the resp_prio', resp_prio);
      }

      if (this.new_ticket_dueDate != this.currentTicket.due_date && this.new_ticket_dueDate != '') {
        let resp_dueDate = await this.ticketsService.editDueDate(this.ticketId, this.new_ticket_dueDate);
        console.log('this is the resp_dueDate', resp_dueDate);
      }

      if (this.new_ticket_assigned != this.currentTicket.assigned_to && this.new_ticket_assigned != '') {
        let resp_assigned = await this.ticketsService.editAssignedTo(this.ticketId, this.new_ticket_assigned);
        console.log('this is the resp_assignes', resp_assigned);
      }

      this.getBack();
    } catch (e) {
      console.error(e);
    }
  }

  clearDescription(event) {
    console.log(event.target.checked);
    if(event.target.checked == true) {
      this.deleteDescription = true;
    } else {
      this.deleteDescription = false;
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

  async checkSubtask(event, subtaskId) {
    try {
      if(event.target.checked == true) {
      this.subtask_ckecked = true;
    }

    if(event.target.checked == false) {
      this.subtask_ckecked = false;
    }

    let resp = await this.subtaskService.editSubtask(subtaskId, this.subtask_ckecked);
    }

    catch (e) {
      console.error(e);
    }
    
  }

}
