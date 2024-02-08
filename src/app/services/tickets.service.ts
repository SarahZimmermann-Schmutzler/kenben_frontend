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

  
  editTicket(ticketId, send_title, send_description, send_assigned, send_prio, send_dueDate) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'title': send_title, 
      'description': send_description,
      'assigned_to': send_assigned,
      'priority': send_prio,
      'due_date': send_dueDate,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  editTitle(ticketId, new_ticket_title) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'title': new_ticket_title,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  editDescription(ticketId, new_ticket_description) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'description': new_ticket_description,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  editPrio(ticketId, new_ticket_prio) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'priority': new_ticket_prio,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  editDueDate(ticketId, new_ticket_dueDate) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'due_date': new_ticket_dueDate,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  editAssignedTo(ticketId, new_ticket_assigned) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    const body = {
      'assigned_to': new_ticket_assigned,
    }
    return lastValueFrom(this.http.patch(url, body));
  }

  deleteTicket(ticketId) {
    const url = `${environment.baseURL}/api/tickets/${ticketId}/`;
    return lastValueFrom(this.http.delete(url));
  }
}
