import { Component, Input } from '@angular/core';
import { WeatherService } from './weather.service';

//Decorator for WeatherComponent
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [WeatherService]
})

//Variables and methods declaration for
//Weathercomponent
export class WeatherComponent {

  @Input()
  city: string;
  weatherForecastReport: any[];
  weatherForecasthistory: any[];
  errorMessage: any;
  cities: any[] = [];
  show: boolean = false;
  hide: boolean = false;
  up: boolean = true;

  constructor(private _weatherService_: WeatherService) {
    localStorage.clear();
  }

  //Validates the input value
  onClick(cty: string) {
    this.hide = false;
    this.up = true;
    if (this.Onvalidate(cty)) {
      this.getWeather();
    }
    else {
      alert("Please fill city details ");
    }
  }

  //Makes call to Weather service and maps the returned response
  getWeather() {
    this._weatherService_.getWeatherForecast(this.city).subscribe(
      data => {
        this.weatherForecastReport = data;
        if (localStorage.getItem(this.city) === null) {
          this.cities.push(this.city);
          localStorage.setItem(this.city, JSON.stringify(this.weatherForecastReport));
          this.show = false;
        }

      },
      err => {
        this.weatherForecastReport = null;
        this.errorMessage = <any>err;
        this.show = true;
      }
    );
  }

  //Validation for input city value
  Onvalidate(key: string): boolean {
    if (key != "" && key != undefined && key != null) {
      this.city = key;
      return true;
    }
    else {
      return false;
    }
  }

  //Gets the key value from localstorage and assigns to 'weatherForecasthistory'
  Onchange(Key: string) {
    this.up = false;
    this.hide = true;
    this.show = false;
    this.weatherForecasthistory = JSON.parse(localStorage.getItem(Key));
  }

}
