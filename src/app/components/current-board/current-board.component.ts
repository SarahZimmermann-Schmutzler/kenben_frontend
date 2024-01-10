import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent {
  board: any = '';
  boardId = '';

  constructor(public boardService: BoardService, private router: Router) { }
  
  async ngOnInit() {
    this.boardId = localStorage.getItem('boardId')
    console.log(this.boardId)
    this.board = await this.boardService.loadCurrentBoard(this.boardId);
    console.log(this.board);
  }

  logout() {
    this.router.navigateByUrl('/');
  }

  backToWorkspace() {
    localStorage.setItem('boardId', '');
    this.router.navigateByUrl('boards');
  }
}
