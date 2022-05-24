import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './authGuard.service';

export const AppRoutes: Routes = [
  {path:'' ,redirectTo:'login',pathMatch:'full'},
  {path:'login', component : LoginComponent },  
  { path: 'home', component: HomeComponent, canActivate:[AuthGuardService] }
	
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
