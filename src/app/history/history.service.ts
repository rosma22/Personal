import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private storageKey = 'cityHistory';

  constructor() { }

  getCityHistory(): string[] {
    const history = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }

  addCityToHistory(city: string): void {
    const history = this.getCityHistory();
    if (!history.includes(city)) {
      history.push(city);
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    }
  }

  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
}
