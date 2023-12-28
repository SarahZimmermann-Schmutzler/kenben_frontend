import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authservice: AuthService, private router: Router) { }
  // hier Service verknüpfen

  async login() {
    try{
      let resp = await this.authservice.loginWithUserAndPassword(this.username, this.password);
      console.log(resp);
      localStorage.setItem('token', resp['token'])
      this.router.navigateByUrl('/login');
    } catch(e) {
      console.error(e);
    }
  }

}