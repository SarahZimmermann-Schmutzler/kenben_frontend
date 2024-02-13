import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { SubtasksService } from 'src/app/services/subtasks.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { UsersService } from 'src/app/services/users.service';

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
  // allSubtasks: any = [];
  // subtasks: any = [];
  ticketId: any = '';
  detailView: boolean = false;
  editView: boolean = false;
  // currentTicket: any = [];
  addTask: boolean = false;
  allUsers: any = [];
  addSubtask: boolean = false;
  currentDraggedElement = '';
  currentDraggedTicket = '';
  currentDraggedTicket_id = '';


  constructor(
    public boardService: BoardService,
    public ticketsService: TicketsService,
    public subtaskService: SubtasksService,
    public userService: UsersService,
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
    this.allUsers = await this.userService.loadUsers();
    console.log('all Users are:', this.allUsers);
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

  closeDetailView($event) {
    this.detailView = $event;
  }

  closeEditView($event) {
    this.editView = $event;
  }

  openEditView($event) {
    this.editView = $event;
    console.log(this.editView);
  }

  closeAddTaskView($event) {
    this.addTask = $event;

  }

  openTaskCreateView() {
    this.addTask = true;
  }

  openAddSubtaskView($event) {
    this.addSubtask = $event;
  }

  closeAddSubtaskView($event) {
    this.addSubtask = $event;
  }

  startDragging(event, cardId) {
    this.currentDraggedElement = cardId;
    console.log('element', this.currentDraggedElement)
  }

  allowDrop(event) {
    event.preventDefault();
  }

  async moveTo(status) {
    try {
      this.currentDraggedTicket = this.tickets.find(ticket => ticket.id == this.currentDraggedElement);
      console.log('funktioniert?', this.currentDraggedTicket['id'])
      console.log('funktioniert?', status)
      this.currentDraggedTicket_id = this.currentDraggedTicket['id']
      let resp_ = await this.ticketsService.editStatus(this.currentDraggedTicket_id, status);
    }
    catch (e) {
      console.error(e);
    }

  }
}
