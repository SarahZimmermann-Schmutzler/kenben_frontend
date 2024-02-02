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
  @Input() ticketId;
  currentTicket: any = '';
  allSubtasks: any = [];
  subtasks: any = [];
  newSubtaskFields:any = [];
  new_subtask_title = '';

  async ngOnInit() {
    this.currentTicket = await this.ticketsService.loadCurrentTicket(this.ticketId);
    console.log(this.currentTicket);
    this.allSubtasks = await this.subtaskService.loadSubtasks();
    console.log(this.allSubtasks);
    this.filterSubtasks();
  }

  constructor(
    public ticketsService: TicketsService,
    public subtaskService: SubtasksService,
    private router: Router,
  ) { }

  filterSubtasks() {
    this.subtasks = this.allSubtasks.filter(s => s.tickets == this.ticketId);
    console.log(this.subtasks);
  }

  getBack() {
    this.router.navigateByUrl('/currentBoard').then(() => {
      window.location.reload();
    });
  }

  closeDetailView() {
    this.editView.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }

  addSubtaskField() {
    this.newSubtaskFields = [...this.newSubtaskFields, this.newSubtaskFields.length];
  }

  removeSubtaskField(i) {
    this.newSubtaskFields.splice(i, 1);
  }

}
