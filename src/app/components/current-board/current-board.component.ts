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

  
  // filters tickets by status
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


  // navigates back to the board-page
  backToWorkspace() {
    localStorage.setItem('boardId', '');
    this.router.navigateByUrl('boards').then(() => {
      window.location.reload();
    });;
  }


  // functions to open and close pop-ups
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

  // binds the id of the ticket on an variable and let the ticket rotate
  startDragging(event, cardId) {
    this.currentDraggedElement = cardId;
    document.getElementById(cardId).classList.add('rotate');
  }


  // allows the ticket to drop
  allowDrop(event) {
    event.preventDefault();
  }


  // gets the ticket by id and changes its status in the backend
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


  // let the dragged ticket disappear 
  hideDraggedTicket(draggedTicketId) {
    document.getElementById(draggedTicketId).classList.add('hide');
  }


  // shows a cloned ticket
  showCloneTicket(new_ticket_status) {
    if (new_ticket_status == 'Todo') {
      this.cloneTodo.push(this.currentDraggedTicket);
      this.cloneProgress = this.cloneProgress.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneAwait = this.cloneAwait.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneDone = this.cloneDone.filter(ticket => ticket !== this.currentDraggedTicket);
    }

    if (new_ticket_status == 'In Progress') {
      this.cloneProgress.push(this.currentDraggedTicket);
      this.cloneTodo = this.cloneTodo.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneAwait = this.cloneAwait.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneDone = this.cloneDone.filter(ticket => ticket !== this.currentDraggedTicket);
    }

    if (new_ticket_status == 'Awaiting Feedback') {
      this.cloneAwait.push(this.currentDraggedTicket);
      this.cloneTodo = this.cloneTodo.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneProgress = this.cloneProgress.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneDone = this.cloneDone.filter(ticket => ticket !== this.currentDraggedTicket);
    }

    if (new_ticket_status == 'Done') {
      this.cloneDone.push(this.currentDraggedTicket);
      this.cloneTodo = this.cloneTodo.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneProgress = this.cloneProgress.filter(ticket => ticket !== this.currentDraggedTicket);
      this.cloneAwait = this.cloneAwait.filter(ticket => ticket !== this.currentDraggedTicket);
    }
  }


  // highlights the columns where the dragged ticket is moved
  highlight(index) {
    document.getElementById(index).classList.add('highlight');
  }


  // removes the highlight
  removeHighlight(index) {
    document.getElementById(index).classList.remove('highlight');
  }
}
