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
  formControl = true;

  constructor(
    public authservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.watchForm();
  }


  async register() {
    try{
      let resp: any = await this.authservice.register(this.username, this.password, this.email)
      // authService siehe services ist Schnittstelle zum Backend
      this.router.navigateByUrl('/login');
    } catch(e) {
      console.error(e);
    }
  }


  backToLogin() {
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });;
  }

  
  watchForm() {
    setInterval(() => {
      if (this.username != '' && this.password != '' && this.email != '') {
        this.formControl = false;
      } else {
        this.formControl = true;
      }
    }, 500);
  }
}
