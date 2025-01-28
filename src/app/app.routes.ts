import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [{ path: 'weather', component: WeatherComponent },
{ path: 'favorites', component: FavoritesComponent },
{ path: '', redirectTo: '/clima', pathMatch: 'full' }];
