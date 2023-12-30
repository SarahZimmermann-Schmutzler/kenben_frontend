import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards:any = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.boards = await this.loadBoards();
    console.log(this.boards);
  }

  loadBoards() {
    const url = environment.baseURL + '/api/boards/';
    return lastValueFrom(this.http.get(url));
    // lastValueFrom wandelt es in Promise um
  }
}
