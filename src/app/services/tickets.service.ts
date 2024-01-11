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
}
