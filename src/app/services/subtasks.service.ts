import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor(private http: HttpClient) { }

  loadSubtasks() {
    const url = environment.baseURL + '/api/subtasks/';
    return lastValueFrom(this.http.get(url));
  }

  createSubtasks(new_subtask_title, ticketId) {
    const url = environment.baseURL + '/api/subtasks/';
    const body = {
      'title': new_subtask_title,
      'tickets': ticketId,
    }
    return lastValueFrom(this.http.post(url, body));
  }
}
