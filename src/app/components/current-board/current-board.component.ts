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
  cloneTodo: any = [];
  cloneProgress: any = [];
  cloneAwait: any = [];
  cloneDone: any = [];
  ticketId: any = '';
  detailView: boolean = false;
  editView: boolean = false;
  addTask: boolean = false;
  allUsers: any = [];
  addSubtask: boolean = false;
  currentDraggedElement = '';
  currentDraggedTicket = '';
  currentDraggedTicket_id = '';
  currentDraggedTicket_status = '';


  constructor(
    public boardService: BoardService,
    public ticketsService: TicketsService,
    public subtaskService: SubtasksService,
    public userService: UsersService,
    private router: Router) { }

  async ngOnInit() {
    this.boardId = localStorage.getItem('boardId')
    this.board = await this.boardService.loadCurrentBoard(this.boardId);
    this.tickets = await this.ticketsService.loadTickets();
    console.log(this.tickets);
    this.filterTickets();
    this.allUsers = await this.userService.loadUsers();
    console.log('all Users are:', this.allUsers);
  }

  
  filterTickets() {
    this.todoTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'Todo');
    this.progressTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'In Progress');
    this.awaitTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'Awaiting Feedback');
    this.doneTickets = this.tickets.filter(s => s.board == this.boardId && s.status == 'Done');
  }


  logout() {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });;
  }


  backToWorkspace() {
    localStorage.setItem('boardId', '');
    this.router.navigateByUrl('boards').then(() => {
      window.location.reload();
    });;
  }


  // open and close pop-ups
  openDetailView(ticketId) {
    this.ticketId = ticketId;
    this.detailView = true;
  }


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


  // drag and drop functions
  startDragging(event, cardId) {
    this.currentDraggedElement = cardId;
    document.getElementById(cardId).classList.add('rotate');
  }


  allowDrop(event) {
    event.preventDefault();
  }


  async moveTo(new_ticket_status) {
    try {
      this.currentDraggedTicket = this.tickets.find(ticket => ticket.id == this.currentDraggedElement);
      this.currentDraggedTicket_id = this.currentDraggedTicket['id'];
      let resp = await this.ticketsService.editStatus(this.currentDraggedTicket_id, new_ticket_status);
      this.hideDraggedTicket(this.currentDraggedTicket_id);
      this.showCloneTicket(new_ticket_status);
      this.removeHighlight(new_ticket_status);
    }
    catch (e) {
      console.error(e);
    }
  }


  hideDraggedTicket(draggedTicketId) {
    document.getElementById(draggedTicketId).classList.add('hide');
  }


  showCloneTicket(new_ticket_status) {
    if (new_ticket_status == 'Todo') {
      this.cloneTodo.push(this.currentDraggedTicket);
      // this.cloneProgress.splice(this.currentDraggedTicket);
      // this.cloneAwait.splice(this.currentDraggedTicket);
      // this.cloneDone.splice(this.currentDraggedTicket);
      // this.cloneProgress = [];
      // this.cloneAwait = [];
      // this.cloneDone = [];
      this.cloneProgress.pop();
      this.cloneAwait.pop();
      this.cloneDone.pop();
    }

    if (new_ticket_status == 'In Progress') {
      this.cloneProgress.push(this.currentDraggedTicket);
      // this.cloneTodo.splice(this.currentDraggedTicket);
      // this.cloneAwait.splice(this.currentDraggedTicket);
      // this.cloneDone.splice(this.currentDraggedTicket);
      // this.cloneTodo = [];
      // this.cloneAwait = [];
      // this.cloneDone = [];
      this.cloneTodo.pop();
      this.cloneAwait.pop();
      this.cloneDone.pop();
    }

    if (new_ticket_status == 'Awaiting Feedback') {
      this.cloneAwait.push(this.currentDraggedTicket);
      // this.cloneProgress.splice(this.currentDraggedTicket);
      // this.cloneTodo.splice(this.currentDraggedTicket);
      // this.cloneDone.splice(this.currentDraggedTicket);
      // this.cloneTodo = [];
      // this.cloneProgress = [];
      // this.cloneDone = [];
      this.cloneTodo.pop();
      this.cloneProgress.pop();
      this.cloneDone.pop();
    }

    if (new_ticket_status == 'Done') {
      this.cloneDone.push(this.currentDraggedTicket);
      // this.cloneProgress.splice(this.currentDraggedTicket);
      // this.cloneAwait.splice(this.currentDraggedTicket);
      // this.cloneTodo.splice(this.currentDraggedTicket);
      // this.cloneTodo = [];
      // this.cloneAwait = [];
      // this.cloneProgress = [];
      this.cloneTodo.pop();
      this.cloneProgress.pop();
      this.cloneAwait.pop();
    }
  }


  highlight(index) {
    document.getElementById(index).classList.add('highlight');
  }


  removeHighlight(index) {
    document.getElementById(index).classList.remove('highlight');
  }
}
