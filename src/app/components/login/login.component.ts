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
  formControl = true;

  constructor(private authservice: AuthService, private router: Router) { }
  // hier Service verknüpfen

  ngOnInit() {
    this.watchForm();
  }


  async login() {
    try {
      let resp = await this.authservice.loginWithUserAndPassword(this.username, this.password);
      localStorage.setItem('token', resp['token'])
      this.router.navigateByUrl('/boards').then(() => {
        window.location.reload();
      });
    } catch (e) {
      console.error(e);
      // window.location.reload();
    }
  }


  // navigates to sign-up-page
  goToSignUp() {
    this.router.navigateByUrl('/signUp').then(() => {
      window.location.reload();
    });
  }


  // activates button after formdata is given
  watchForm() {
    setInterval(() => {
      if (this.username != '' && this.password != '') {
        this.formControl = false;
      } else {
        this.formControl = true;
      }
    }, 500);
  }
}
