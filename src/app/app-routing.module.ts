import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChartsComponent } from './charts/charts.component';
import { QuestionsComponent } from './questions/questions.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'graphs',
    component: ChartsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: '**',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
