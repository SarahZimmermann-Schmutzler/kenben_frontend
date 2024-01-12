import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
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

  constructor(public boardService: BoardService, public ticketsService: TicketsService, private router: Router) { }
  
  async ngOnInit() {
    this.boardId = localStorage.getItem('boardId')
    // console.log(this.boardId)
    this.board = await this.boardService.loadCurrentBoard(this.boardId);
    // console.log(this.board);
    this.tickets = await this.ticketsService.loadTickets();
    console.log(this.tickets);
    this.filterTickets();
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

  logout() {
    this.router.navigateByUrl('/');
  }

  backToWorkspace() {
    localStorage.setItem('boardId', '');
    this.router.navigateByUrl('boards');
  }
}
