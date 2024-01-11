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
  ticketsOfThisBoard: any = [];

  constructor(public boardService: BoardService, public ticketsService: TicketsService, private router: Router) { }
  
  async ngOnInit() {
    this.boardId = localStorage.getItem('boardId')
    // console.log(this.boardId)
    this.board = await this.boardService.loadCurrentBoard(this.boardId);
    // console.log(this.board);
    this.tickets = await this.ticketsService.loadTickets();
    console.log(this.tickets);
    this.ticketsOfThisBoard = this.tickets.filter(s => s.board == this.boardId);
    console.log(this.ticketsOfThisBoard);
  }

  logout() {
    this.router.navigateByUrl('/');
  }

  backToWorkspace() {
    localStorage.setItem('boardId', '');
    this.router.navigateByUrl('boards');
  }
}
