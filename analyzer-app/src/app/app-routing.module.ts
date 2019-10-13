import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { AuthGuard } from './guard/auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'chart', component: DashboardViewComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
