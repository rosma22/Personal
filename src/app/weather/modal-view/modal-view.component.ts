import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FavoritesService } from '../../favorites/favorites.service';
export interface Condition {
  text: string;
  icon: string;
}

export interface Location {
  name: string;
  localtime?: Date;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  humidity: number;
  wind_kph: number;
  condition: Condition;
}

export interface IntWeatherData {
  current: Current;
  location: Location;
}

@Component({
  selector: 'app-modal-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css']
})
export class ModalViewComponent {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() weatherData!: IntWeatherData;
  favorite: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue = changes['isOpen'].currentValue;
    if (currentValue == true) {
      this.favorite = this.favoritesService.isFavorite(this.weatherData?.location.name);
    }
  }

  open() {
    this.isOpen = true;
    // Issue the change to the parent component
    this.isOpenChange.emit(this.isOpen); 
  }

  toggleFavorite() {
    // Change favorite status
    this.favorite = !this.favorite; 

    if (this.favorite == true) {
      this.favoritesService.addFavorites(this.weatherData?.location.name);
    } else {
      this.favoritesService.clearFavorites(this.weatherData?.location.name);
    }
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
