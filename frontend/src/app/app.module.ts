// app.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './authentication/admin/admin.component';
import { BannerComponent } from './banner/banner.component';
import { CarouselModule } from 'primeng/carousel';
import { NavComponent } from './nav/nav.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { TopOffersComponent } from './top-offers/top-offers.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    AccountComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    BannerComponent,
    NavComponent,
    ElectronicsComponent,
    TopOffersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
