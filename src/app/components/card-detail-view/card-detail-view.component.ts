import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubtasksService } from 'src/app/services/subtasks.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-card-detail-view',
  templateUrl: './card-detail-view.component.html',
  styleUrls: ['./card-detail-view.component.scss']
})




export class CardDetailViewComponent {
  @Output() detailView = new EventEmitter();
  // @Input() detailView;
  // @Input() currentTicket;
  // @Input() subtasks;
  @Input() ticketId;
  currentTicket: any = '';
  allSubtasks: any = [];
  subtasks: any = [];

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
  ) { }

  filterSubtasks() {
    this.subtasks = this.allSubtasks.filter(s => s.tickets == this.ticketId);
    console.log(this.subtasks);
  }

  closeDetailView() {
    this.detailView.emit(false);
  }

  doNotClose(e: Event) {
    e.stopPropagation();
  }

}
