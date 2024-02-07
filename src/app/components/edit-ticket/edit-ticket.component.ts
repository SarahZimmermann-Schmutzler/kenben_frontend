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
  send_title = '';
  new_ticket_description = '';
  send_description = '';
  new_ticket_dueDate = '';
  send_dueDate = '';
  new_ticket_prio = '';
  send_prio = '';
  new_ticket_assigned: any = [];
  send_assigned: any = [];
  formControl = true;
  editedData: any = [];


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
      if (this.new_ticket_prio != '' || this.new_ticket_title != '' || this.new_ticket_assigned != '' || this.new_ticket_dueDate != '' || this.new_ticket_description != '') {
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

//   async editTicket() {
//     this.getEditedData();
//     console.log(this.send_title);

//     try {
//       let resp = await this.ticketsService.editTicket(
//       this.ticketId,
//       this.send_title,
//       this.send_description,
//       this.send_assigned,
//       this.send_prio,
//       this.send_dueDate,
//       );
//     console.log('this is the resp', resp);
//     // this.getBack();
//   } catch(e) {
//     console.error(e);
//   }
// }

async editTicket() {
  try {
    if(this.new_ticket_title != this.currentTicket.title && this.new_ticket_title != '') {
      let resp_title = await this.ticketsService.editTitle(this.ticketId,this.new_ticket_title);
      console.log('this is the resp_title', resp_title);
    }

    if((this.new_ticket_description != '' && this.currentTicket.description == '')) {
      let resp_desc = await this.ticketsService.editDescription(this.ticketId,this.new_ticket_description);
      console.log('this is the resp_desc', resp_desc);
    }

    if(this.new_ticket_prio != this.currentTicket.priority && this.new_ticket_prio != '') {
      let resp_prio = await this.ticketsService.editPrio(this.ticketId,this.new_ticket_prio);
      console.log('this is the resp_prio', resp_prio);
    }
    
    if(this.new_ticket_dueDate != this.currentTicket.due_date && this.new_ticket_dueDate != '') {
      let resp_dueDate = await this.ticketsService.editDueDate(this.ticketId,this.new_ticket_dueDate);
      console.log('this is the resp_dueDate', resp_dueDate);
    }
  
  // this.getBack();
} catch(e) {
  console.error(e);
}
}

getEditedData() {
  if (this.new_ticket_title != this.currentTicket.title && this.new_ticket_title != '') {
    this.send_title = this.new_ticket_title;
    this.editedData.push(this.send_title);
  }

  if (this.new_ticket_description != this.currentTicket.description) {
    this.send_description = this.new_ticket_description;
    this.editedData.push(this.send_description);
  }

  if (this.new_ticket_dueDate != this.currentTicket.due_date) {
    this.send_dueDate = this.new_ticket_dueDate;
    this.editedData.push(this.send_dueDate);
  }

  if (this.new_ticket_prio != this.currentTicket.priority && this.new_ticket_prio != '') {
    this.send_prio = this.new_ticket_prio;
    this.editedData.push(this.send_prio);
  }

  if (this.new_ticket_assigned != this.currentTicket.assigned_to && this.new_ticket_assigned != '') {
    this.send_assigned = this.new_ticket_assigned;
    this.editedData.push(this.send_assigned);
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
