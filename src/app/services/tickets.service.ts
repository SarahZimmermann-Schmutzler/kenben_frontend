import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }


  loadTickets() {
    const url = environment.baseURL + '/api/tickets/';
    return lastValueFrom(this.http.get(url));
  }

  loadCurrentTicket(ticketId) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    return lastValueFrom(this.http.get(url));
  }

  createTicket(new_title, new_description, assigned_to, new_prio, new_dueDate, boardId) {
    const url = environment.baseURL + '/api/tickets/';
    const body = {
      'title': new_title,
      'description': new_description,
      'assigned_to': assigned_to,
      'priority': new_prio,
      'due_date': new_dueDate,
      'board': boardId,
    }
    return lastValueFrom(this.http.post(url, body));
  }

  editTicket(ticketId, new_ticket_title, new_ticket_description, new_ticket_assigned, new_ticket_prio, new_ticket_dueDate, boardId) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'title': new_ticket_title,
      'description': new_ticket_description,
      'assigned_to': new_ticket_assigned,
      'priority': new_ticket_prio,
      'due_date': new_ticket_dueDate,
      'board': boardId,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  deleteTicket(ticketId) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    return lastValueFrom(this.http.delete(url));
  }
}
