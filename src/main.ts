import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { WeatherComponent } from './app/weather/weather.component';
import { FavoritesComponent } from './app/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryComponent } from './app/history/history.component';

// Define las rutas de tu aplicación
const routes: any = [
  { path: '', component: WeatherComponent },  // Componente principal cuando la ruta está vacía
  { path: 'favorites', component: FavoritesComponent },  // Componente cuando la ruta es favorites
  { path: 'history', component: HistoryComponent },  // Componente cuando la ruta es favorites
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),  // Importar HttpClientModule
    importProvidersFrom(RouterModule),  // Importar RouterModule
    provideRouter(routes),  // Configurar las rutas
    importProvidersFrom(BrowserAnimationsModule)  // Agregar BrowserAnimationsModule para habilitar animaciones
  ]
})
  .catch(err => console.error(err));
