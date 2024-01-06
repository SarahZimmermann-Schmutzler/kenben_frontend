import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
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
    this.boards = await this.loadBoards();
    console.log(this.boards);
  }

  loadBoards() {
    const url = environment.baseURL + '/api/boards/';
    return lastValueFrom(this.http.get(url));
    // lastValueFrom wandelt es in Promise um
  }

  async createBoard() {
    try {
      let resp = await this.boardService.createBoard(this.title);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  }

}
