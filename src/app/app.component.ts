import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './models/model.alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public allAlerts: Alert[] = [];

  constructor(
    private alertService: AlertService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAlerts();
  }

  async getAlerts() {
    this.allAlerts = await this.alertService.getAlerts().toPromise();
    console.log(this.allAlerts)
  }
}
