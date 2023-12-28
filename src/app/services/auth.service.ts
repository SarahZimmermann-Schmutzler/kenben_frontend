import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, ) { }
  // http Client wird erst geladen, wenn wir ihn brauchen

  public loginWithUserAndPassword(username:string, password:string) {
    const url = environment.baseURL + '/login/';
    const body = {
      'username': username,
      'password': password
    }
    return lastValueFrom(this.http.post(url, body));
    // lastValueFrom wandelt es in Promise um
  }
   }
