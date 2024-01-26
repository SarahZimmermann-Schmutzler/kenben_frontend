import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loadUsers() {
    const url = environment.baseURL + '/api/allUsers/';
    return lastValueFrom(this.http.get(url));
    // lastValueFrom wandelt es in Promise um
  }
}
