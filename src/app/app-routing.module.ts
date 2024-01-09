import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BoardsComponent } from './components/boards/boards.component';
import { RegisterComponent } from './components/register/register.component';
import { CurrentBoardComponent } from './components/current-board/current-board.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'boards', component:BoardsComponent},
  {path: 'signUp', component:RegisterComponent},
  {path: 'currentBoard', component:CurrentBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
