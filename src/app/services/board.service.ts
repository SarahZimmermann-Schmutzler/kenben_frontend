import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  createBoard(title:any) {
    const url = environment.baseURL + '/api/boards/';
    const body = {
      'title': title,
    }
    return lastValueFrom(this.http.post(url, body));
  }

  loadBoards() {
    const url = environment.baseURL + '/api/boards/';
    return lastValueFrom(this.http.get(url));
    // lastValueFrom wandelt es in Promise um
  }

  loadCurrentBoard(boardId) {
    const url = `${environment.baseURL} + '/api/boards/${boardId}'`;
    return lastValueFrom(this.http.get(url));
    // lastValueFrom wandelt es in Promise um
  }
}
