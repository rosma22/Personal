import { Component } from '@angular/core';
import { AlertComponent } from '../alerts/alert/alert.component';
import { MenuComponent } from '../menu/menu.component';

import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { WeatherService } from '../weather/weather.service';
import { ModalViewComponent } from '../weather/modal-view/modal-view.component';
import { HistoryService } from './history.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-history',
  imports: [MenuComponent, AlertComponent, MatTableModule, MatPaginatorModule, MatButtonModule, ModalViewComponent, LoadingComponent, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  displayedColumns: string[] = ['id', 'city'];
  dataSource: any = [];
  totalItems = 0; // Total elements in the data
  pageSize = 5; // Number of elements per page
  isModalOpen = false;
  weatherData: any;
  isLoading = false;

  constructor(private historyService: HistoryService,private weatherService: WeatherService,) {
    this.loadData(0, this.pageSize); // Load the first 5 elements
  }

  loadData(start: number, pageSize: number): void {
    let data: any = [];

    let fav = this.historyService.getCityHistory();
    this.totalItems = fav.length;

    // Cargar solo los elementos correspondientes a la página actual
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
