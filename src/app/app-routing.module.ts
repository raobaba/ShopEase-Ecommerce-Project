import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminComponent } from './authentication/admin/admin.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'authentication/login',component:LoginComponent},
  {path:'authentication/register',component:RegisterComponent},
  {path:'authentication/admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
