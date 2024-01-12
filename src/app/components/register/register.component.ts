import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(
    public authservice: AuthService,
    private router: Router,
  ) { }

  async register() {
    try{
      let resp: any = await this.authservice.register(this.username, this.password, this.email)
      // authService siehe services ist Schnittstelle zum Backend
      console.log(resp);
      this.router.navigateByUrl('/login');
    } catch(e) {
      console.error(e);
    }
  }

  backToLogin() {
    this.router.navigateByUrl('/login');
  }
}
