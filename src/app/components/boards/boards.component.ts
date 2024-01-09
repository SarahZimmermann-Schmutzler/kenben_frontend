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
  newBoards: any = [];
  title: any = '';

  constructor(private http: HttpClient, public boardService: BoardService) { }

  async ngOnInit() {
    this.boards = await this.boardService.loadBoards();
    // console.log(this.boards);
  }

  async createBoard() {
    try {
      let resp = await this.boardService.createBoard(this.title);
      // sendet title an backend
      // empfängt als response das neue board als Array
      // console.log(resp);
      this.clearTitleField();
      this.showNewBoard(resp)
    } catch (e) {
      console.error(e);
    }
  }


  clearTitleField() {
    // löscht Inputfeld
    this.title = '';
  }


  showNewBoard(resp) {
    // pusht titel des boards in mein Array newBoards
    this.newBoards.push(resp['title'])
    // console.log(this.newBoards)
  }
}
