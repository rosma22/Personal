import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);

  alert$ = this.alertSubject.asObservable();

  constructor() { }

  showAlert(type: 'success' | 'error' | 'info' | 'warning', message: string): void {
    console.log('here');
    this.alertSubject.next({ type, message });
    setTimeout(() => this.clearAlert(), 5000); // Limpia la alerta después de 5 segundos
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }
}
