import { Component } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-current-board',
  templateUrl: './current-board.component.html',
  styleUrls: ['./current-board.component.scss']
})
export class CurrentBoardComponent {
  board: any = '';
  boardId = '';

  constructor(public boardService: BoardService) { }
  
  async ngOnInit() {
    this.boardId = localStorage.getItem('boardId')
    console.log(this.boardId)
    this.board = await this.boardService.loadCurrentBoard(this.boardId);
    // console.log(this.boards);
  }
}
