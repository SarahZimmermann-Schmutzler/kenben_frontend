import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  formControl = true;

  constructor(private http: HttpClient, public boardService: BoardService, private router: Router) { }

  async ngOnInit() {
    this.boards = await this.boardService.loadBoards();
    // console.log(this.boards);
    this.watchForm();
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
    // löscht Inhalt Inputfeld
    this.title = '';
  }


  showNewBoard(resp) {
    // pusht titel des boards in mein Array newBoards
    this.newBoards.push(resp)
    console.log(this.newBoards)
  }


  logout() {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });;
  }

  openCurrentBoard(boardId) {
    localStorage.setItem('boardId', boardId);
    this.router.navigateByUrl('currentBoard').then(() => {
      window.location.reload();
    });
  }

  watchForm() {
    setInterval(() => {
      if (this.title != '') {
        this.formControl = false;
      } else {
        this.formControl = true;
      }
    }, 500);
  }
}
