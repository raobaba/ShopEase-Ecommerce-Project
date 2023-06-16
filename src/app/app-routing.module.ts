import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminComponent } from './authentication/admin/admin.component';
import { BannerComponent } from './banner/banner.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: BannerComponent },
  { path: '', component: NavComponent },
  {
    path: 'authentication/login',
    component: LoginComponent,
    data: { hideBanner: true },
  
  },
  { path: 'authentication/register', component: RegisterComponent,  data: { hideNav: true }, },
  { path: 'authentication/admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
