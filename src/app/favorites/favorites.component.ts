import { Component } from '@angular/core';
import { AlertComponent } from '../alerts/alert/alert.component';
import { MenuComponent } from '../menu/menu.component';

import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesService } from './favorites.service';
import { WeatherService } from '../weather/weather.service';
import { ModalViewComponent } from '../weather/modal-view/modal-view.component';
import { CommonModule } from '@angular/common'; 
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-favorites',
  imports: [MenuComponent, AlertComponent, MatTableModule, MatPaginatorModule, MatButtonModule, ModalViewComponent, CommonModule, LoadingComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

  displayedColumns: string[] = ['id', 'city'];
  dataSource: any = [];
  totalItems = 0; // Total elements in the data 
  pageSize = 5; // Number of elements per page
  isModalOpen = false;
  weatherData: any;
  isLoading = false;

  constructor(private favoritesService: FavoritesService,private weatherService: WeatherService,) {
    this.loadData(0, this.pageSize); // Load the first 5 elements
  }

  loadData(start: number, pageSize: number): void {
    let data: any = [];

    let fav = this.favoritesService.getFavorites();
    this.totalItems = fav.length;

    // Load only the elements corresponding to the current page.
    const end = start + pageSize;
    const paginatedFav = fav.slice(start, end);

    paginatedFav.forEach((element, i) => {
      data.push({
        id: start + i + 1,
        name: `${element}`,
      });
    });

    this.dataSource = data;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    const start = event.pageIndex * event.pageSize;
    this.loadData(start, event.pageSize);
  }

  onRowClick(row: any) {
    this.isLoading = true;

    this.weatherService.getCurrentWeather(row.name).subscribe(
      (data) => {
        this.isModalOpen = true;
        this.isLoading = false;
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching weather:', error);
      }
    );
  }

}
