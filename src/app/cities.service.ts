import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  cities : any [] = [
    { name: 'Madrid', country: 'España' },
    { name: 'Barcelona', country: 'España' },
    { name: 'New York', country: 'Estados Unidos' },
    { name: 'Los Angeles', country: 'Estados Unidos' },
    { name: 'Paris', country: 'Francia' },
    { name: 'Lyon', country: 'Francia' },
    { name: 'Berlin', country: 'Alemania' },
    { name: 'Munich', country: 'Alemania' },
    { name: 'Rome', country: 'Italia' },
    { name: 'Milan', country: 'Italia' },
    { name: 'Tokyo', country: 'Japón' },
    { name: 'Osaka', country: 'Japón' },
    { name: 'Beijing', country: 'China' },
    { name: 'Shanghai', country: 'China' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Melbourne', country: 'Australia' },
    { name: 'Toronto', country: 'Canadá' },
    { name: 'Vancouver', country: 'Canadá' },
    { name: 'Moscow', country: 'Rusia' },
    { name: 'Saint Petersburg', country: 'Rusia' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Córdoba', country: 'Argentina' },
    { name: 'Sao Paulo', country: 'Brasil' },
    { name: 'Rio de Janeiro', country: 'Brasil' },
    { name: 'Cape Town', country: 'Sudáfrica' },
    { name: 'Johannesburg', country: 'Sudáfrica' },
    { name: 'Cairo', country: 'Egipto' },
    { name: 'Alexandria', country: 'Egipto' }
  ];

  constructor() { }

  getCities(): any[] {
    return this.cities;
  }
}
