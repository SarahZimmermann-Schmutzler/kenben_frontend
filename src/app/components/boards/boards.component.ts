import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: any = [];
  title: any = '';

  constructor(private http: HttpClient, public boardService: BoardService) { }

  async ngOnInit() {
    this.boards = await this.boardService.loadBoards();
    // console.log(this.boards);
  }

  async createBoard() {
    try {
      let resp = await this.boardService.createBoard(this.title);
      // console.log(resp);
      this.clearTitleField();
      // this.ngOnInit();
    } catch (e) {
      console.error(e);
    }
  }


  clearTitleField() {
    this.title = '';
  }
}
