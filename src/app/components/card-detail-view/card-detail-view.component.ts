import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SubtasksService } from 'src/app/services/subtasks.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-card-detail-view',
  templateUrl: './card-detail-view.component.html',
  styleUrls: ['./card-detail-view.component.scss']
})


export class CardDetailViewComponent {
  @Output() detailView = new EventEmitter();
  @Output() editView = new EventEmitter();
  @Input() ticketId;
  currentTicket: any = '';
  allSubtasks: any = [];
  subtasks: any = [];

  async ngOnInit() {
    this.currentTicket = await this.ticketsService.loadCurrentTicket(this.ticketId);
    this.allSubtasks = await this.subtaskService.loadSubtasks();
    this.filterSubtasks();
  }

  constructor(
    public ticketsService: TicketsService,
    public subtaskService: SubtasksService,
    private router: Router,
  ) { }
  

  // shows the subtasks of the clicked ticket
  filterSubtasks() {
    this.subtasks = this.allSubtasks.filter(s => s.tickets == this.ticketId);
  }


  // deletes the clicked ticket
  async deleteTicket() {
    await this.ticketsService.deleteTicket(this.ticketId);
    this.getBack();
  }


  // navigates back to the current-board-page
  getBack() {
    this.router.navigateByUrl('/currentBoard').then(() => {
      window.location.reload();
    });
  }


  // closes the card-detail-view-popup
  closeDetailView() {
    this.detailView.emit(false);
  }


  // prevents closing popup by clicking on formular
  doNotClose(e: Event) {
    e.stopPropagation();
  }


  // opens edit-view-popup
  openEditView() {
    this.editView.emit(true);
  }
}
