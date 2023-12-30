import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BoardsComponent } from './components/boards/boards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
