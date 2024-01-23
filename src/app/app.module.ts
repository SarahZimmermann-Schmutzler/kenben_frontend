import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BoardsComponent } from './components/boards/boards.component';
import { RegisterComponent } from './components/register/register.component';
import { CurrentBoardComponent } from './components/current-board/current-board.component';
import { CardDetailViewComponent } from './components/card-detail-view/card-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardsComponent,
    RegisterComponent,
    CurrentBoardComponent,
    CardDetailViewComponent,
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
