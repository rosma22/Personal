import { Component } from '@angular/core';
import { AlertsService, Alert } from '../alerts.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alert: Alert | null = null;

  constructor(private alertService: AlertsService) {
    this.alertService.alert$.subscribe(alert => {
      this.alert = alert;
    });
  }

  closeAlert(): void {
    this.alertService.clearAlert();
  }

}
