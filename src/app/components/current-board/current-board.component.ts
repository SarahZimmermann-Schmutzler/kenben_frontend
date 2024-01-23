import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { SubtasksService } from 'src/app/services/subtasks.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent {
  board: any = '';
  boardId = '';
  tickets: any = [];
  todoTickets: any = [];
  progressTickets: any = [];
  awaitTickets: any = [];
  doneTickets: any = [];
  assigned: any = [];
  // allSubtasks: any = [];
  // subtasks: any = [];
  ticketId: any = '';
  detailView: boolean = false;
  // currentTicket: any = [];
  addTask: boolean = false;

  constructor(
    public boardService: BoardService, 
    public ticketsService: TicketsService, 
    public subtaskService: SubtasksService,
    private router: Router) { }
  
  async ngOnInit() {
    this.boardId = localStorage.getItem('boardId')
    // console.log(this.boardId)
    this.board = await this.boardService.loadCurrentBoard(this.boardId);
    // console.log(this.board);
    this.tickets = await this.ticketsService.loadTickets();
    console.log(this.tickets);
    this.filterTickets();
    // this.allSubtasks = await this.subtaskService.loadSubtasks();
    // console.log(this.allSubtasks);
  }

  filterTickets() {
    this.todoTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'Todo');
    this.progressTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'In Progress');
    this.awaitTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'Awaiting Feedback');
    this.doneTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'Done');
    console.log(this.todoTickets);
    console.log(this.progressTickets);
    console.log(this.awaitTickets);
    console.log(this.doneTickets);
  }

  capitalsOfAssigned() {
    this.assigned = this.todoTickets.filter(s => s.assigned_to)
  }


  // filterSubtasks() {
  //   this.subtasks = this.allSubtasks.filter(s => s.tickets == this.ticketId);
  //   console.log(this.subtasks);
  // }


  logout() {
    this.router.navigateByUrl('/');
  }

  backToWorkspace() {
    localStorage.setItem('boardId', '');
    this.router.navigateByUrl('boards');
  }

  openDetailView(ticketId) {
    this.ticketId = ticketId;
    this.detailView = true;
    console.log(this.detailView);

    // this.currentTicket = await this.ticketsService.loadCurrentTicket(ticketId);
    // console.log(this.currentTicket);
    // this.filterSubtasks();
  }

  // child-component card-detail-view

  closeView($event) {
    this.detailView = $event;
  }

  closeAddTaskView($event) {
    this.addTask = $event;
  }

  openTaskCreateView() {
    this.addTask = true;
  }

  // closeDetailView() {
  //   this.detailView = false;
  // }

  // doNotClose(e:Event) {
  //   e.stopPropagation();
  // }
}
