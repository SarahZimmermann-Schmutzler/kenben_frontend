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
    this.watchForm();
  }


  // creates new board
  async createBoard() {
    try {
      let resp = await this.boardService.createBoard(this.title);
      // sends title to backend
      // feches as response the new board as array
      this.clearTitleField();
      this.showNewBoard(resp)
    } catch (e) {
      console.error(e);
    }
  }


  // clears inputfield
  clearTitleField() {
    this.title = '';
  }


  // pushes new title in array thats shown on board page
  showNewBoard(resp) {
    this.newBoards.push(resp)
  }


  logout() {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });;
  }


  // opens the board that is clicked on
  openCurrentBoard(boardId) {
    localStorage.setItem('boardId', boardId);
    this.router.navigateByUrl('currentBoard').then(() => {
      window.location.reload();
    });
  }


  // activates button after formdata is given
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