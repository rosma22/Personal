import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'Favorites';

  constructor() { }

  isFavorite(city: string): boolean {
    const favorites = this.getFavorites(); // Usamos la función getFavorites para obtener el arreglo.
    return favorites.includes(city); // Verificamos si la ciudad está en el arreglo.
  }

  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorites(fav: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(fav)) {
      favorites.push(fav);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  clearFavorites(favoritesRemove: string): void {
    // Obtener el valor actual del localStorage
    let favorites = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  
    // Filtrar el arreglo para eliminar la ciudad especificada
    favorites = favorites.filter((fav: string) => fav !== favoritesRemove);
  
    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
