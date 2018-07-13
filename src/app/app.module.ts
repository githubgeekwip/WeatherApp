import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WeatherComponent } from './Weather/weather.component';
import { DatePipe } from './date.pipe';
import { HeaderComponent } from 'src/app/Header/header.component';
import { RouterModule, Routes } from '@angular/router';

//Declaring components,modules for AppModule
@NgModule({
  declarations: [
    AppComponent, WeatherComponent, DatePipe, HeaderComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
