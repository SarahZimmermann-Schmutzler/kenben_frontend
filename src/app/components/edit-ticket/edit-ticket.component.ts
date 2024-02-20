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
  @Input() allUsers;
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
  new_ticket_status = '';
  new_ticket_assigned: any = [];
  formControl = true;
  deleteDescription = false;
  subtask_ckecked: boolean;
  subtask_delete = false;
  checked_low = false;
  checked_middle = false;
  checked_high = false;
  checked_todo = false;
  checked_progress = false;
  checked_feedback = false;
  checked_done = false;
  assignedTo: any = [];
  assignedToUsers = [];
  members: any = [];
  a: any = [];


  async ngOnInit() {
    this.currentTicket = await this.ticketsService.loadCurrentTicket(this.ticketId);
    console.log('current Ticket', this.currentTicket);
    this.allSubtasks = await this.subtaskService.loadSubtasks();
    console.log(this.allSubtasks);
    this.filterSubtasks();
    this.watchForm();
    this.renderPrio();
    this.renderStatus();
    this.renderAssignedTo();
  }

  constructor(
    public ticketsService: TicketsService,
    public subtaskService: SubtasksService,
    private router: Router,
  ) { }

  watchForm() {
    setInterval(() => {
      if (this.new_ticket_prio != '' || this.new_ticket_status != '' || this.new_ticket_title != '' || this.new_ticket_assigned != '' || this.new_ticket_dueDate != '' || this.new_ticket_description != '' || this.deleteDescription == true || this.subtask_ckecked == true || this.subtask_ckecked == false) {
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

      if (this.new_ticket_status != this.currentTicket.status && this.new_ticket_status != '') {
        let resp_status = await this.ticketsService.editStatus(this.ticketId, this.new_ticket_status);
        console.log('this is the resp_prio', resp_status);
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
    if (event.target.checked == true) {
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

  getStatusValue(event) {
    if (event.target.checked == true) {
      this.new_ticket_status = event.target.value;
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
      if (event.target.checked == true) {
        this.subtask_ckecked = true;
      }

      if (event.target.checked == false) {
        this.subtask_ckecked = false;
      }

      let resp = await this.subtaskService.editSubtask(subtaskId, this.subtask_ckecked);
    }

    catch (e) {
      console.error(e);
    }

  }

  async deleteSubtask(subtaskId) {
    try {
      this.subtask_delete = true;
      let resp = await this.subtaskService.deleteSubtask(subtaskId);
    }

    catch (e) {
      console.error(e);
    }
  }

  renderPrio() {
    if(this.currentTicket['priority'] == 'Low') {
      this.checked_low = true;
    } else {
      this.checked_low = false;
    }

    if(this.currentTicket['priority'] == 'Middle') {
      this.checked_middle = true;
    }else {
      this.checked_middle = false;
    }

    if(this.currentTicket['priority'] == 'High') {
      this.checked_high = true;
    }else {
      this.checked_high = false;
    }

    console.log('render Prio', this.checked_low);
    console.log('render Prio', this.checked_middle);
    console.log('render Prio', this.checked_high)
  }

  renderStatus() {
    if(this.currentTicket['status'] == 'Todo') {
      this.checked_todo = true;
    } else {
      this.checked_todo = false;
    }

    if(this.currentTicket['status'] == 'In Progress') {
      this.checked_progress = true;
    }else {
      this.checked_progress = false;
    }

    if(this.currentTicket['status'] == 'Awaiting Feedback') {
      this.checked_feedback = true;
    }else {
      this.checked_feedback = false;
    }

    if(this.currentTicket['status'] == 'Done') {
      this.checked_done = true;
    }else {
      this.checked_done = false;
    }
  }

  renderAssignedTo() {
    console.log ('assigned_to', this.currentTicket['assigned_to'])

    for (let i = 0; i < this.allUsers.length; i++) {
      this.assignedToUsers = this.allUsers[i]['id'];
      // this.members = this.allUsers.find(s => s.assignedToUsers == this.currentTicket['assigned_to'])
      // console.log ('assigned_to_users', this.members)
    }

    // for (let j = 0; j < this.assignedToUsers.length; j++) {
    //   this.a = this.assignedToUsers['id'];
    //   // console.log('a', this.a);
    // }

    // console.log('neues Ergebnis', this.assignedToUsers);

    console.log('a', this.a);

    // this.members = this

    // this.members = this.allUsers.find(s => s.allUsers.id == this.assignedTo)
  }

}
