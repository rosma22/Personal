import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CitiesService } from '../cities.service';
import { AlertsService } from '../alerts/alerts.service';
import { AlertComponent } from '../alerts/alert/alert.component';
import { HistoryService } from '../history/history.service';
import { WeatherService } from './weather.service';
import { ModalViewComponent } from './modal-view/modal-view.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    MenuComponent, 
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule, 
    AutocompleteLibModule, 
    AlertComponent, 
    ModalViewComponent,
    RouterModule,
    LoadingComponent
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  form: FormGroup;
  keyword = 'name';
  cities : any = [];
  filteredCityNames: string[] = this.cities.map((city: { name: string; }) => city.name);
  isModalOpen = false;
  weatherData: any;
  isLoading = false;

  constructor(
      private fb: FormBuilder, 
      private citiesService: CitiesService, 
      private alertService: AlertsService,
      private historyService: HistoryService,
      private weatherService: WeatherService,
    ) {
    this.form = this.fb.group({
      country: [''],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    //Get Cities
    this.cities = this.citiesService.getCities();
  }

  onSubmit() {
    if (this.form.valid) {
      let city = this.form.get('city')?.value;
      this.getCurrentyWeather(city.name);
    }
  }

  selectEvent(item: any) {
    //console.log('item-->', item.name);
  }

  onChangeSearch(val: string) {
  }
  
  onFocused(e: any){
  }

  filterList = (value: string, country: string) => {
    const regex = new RegExp(value, 'i');
    return this.cities.filter((city: { name: string; country: string; }) => {
      return regex.test(city.name) && (country === '' || city.country.toLowerCase().includes(country.toLowerCase()));
    });
  }

  onSelected(event:any) {
  }

  getCurrentyWeather(city: string) {
    this.isLoading = true;
    this.weatherService.getCurrentWeather(city).subscribe(
      (data) => {
        this.isLoading = false;
        this.isModalOpen = true;
        this.weatherData = data;
        this.form.get('city')?.setValue(null);
        //Save history the city selected
        this.historyService.addCityToHistory(city);
      },
      (error) => {
        this.alertService.showAlert('error', 'No information found!');
        console.error('Error fetching weather:', error);
      }
    );
  }
}
