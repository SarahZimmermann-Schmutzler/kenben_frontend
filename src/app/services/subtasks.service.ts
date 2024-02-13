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

  createSubtask(new_subtask_title, new_subtask_assigned, new_subtask_duedate, ticketId) {
    const url = environment.baseURL + '/api/subtasks/';
    const body = {
      'title': new_subtask_title,
      'assigned': new_subtask_assigned,
      'due_date': new_subtask_duedate,
      'tickets': ticketId,
    }
    return lastValueFrom(this.http.post(url, body));
  }

  editSubtask(subtaskId, subtask_checked) {
    const url = `${environment.baseURL}/api/subtasks/${subtaskId}/`;
    const body = {
      'checked': subtask_checked,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  deleteSubtask(subtaskId) {
    const url = `${environment.baseURL}/api/subtasks/${subtaskId}/`;
    return lastValueFrom(this.http.delete(url));
  }
}
