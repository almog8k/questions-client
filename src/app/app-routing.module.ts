import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GraphsComponent } from './graphs/graphs.component';
import { QuestionsComponent } from './questions/questions.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'questions', 
    component: QuestionsComponent,
    canActivate: [AuthGuard]
   },
   { path: 'graphs', 
   component: GraphsComponent,
   canActivate: [AuthGuard]
  },
  { path: 'register', 
  component: UserRegisterComponent
 }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
