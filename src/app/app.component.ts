import {Component} from '@angular/core';
import {AlertService} from './services/alert.service';
import {Alert} from './models/model.alert';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public allAlerts: Alert[] = [];
  public originalAllAlerts: Alert[] = [];
  public activeFilters: any = {};

  constructor(
    private alertService: AlertService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAlerts();
  }

  async getAlerts() {
    this.allAlerts = await this.alertService.getAlerts().toPromise();
    this.originalAllAlerts = _.cloneDeep(this.allAlerts);
  }

  filterAlertsBy(filter: any) {
    const {
      category,
      value,
    } = filter;

    if (!this.activeFilters[category]) {
      this.activeFilters[category] = value;
    }
    this.allAlerts = this.activeFilterData(this.activeFilters, this.originalAllAlerts);
  }

  removeFilter(filter: any) {
    delete this.activeFilters[filter];
    this.allAlerts = this.activeFilterData(this.activeFilters, this.originalAllAlerts);
  }

  activeFilterData(activeFilters: any, data: Alert[]): Alert[] {
    let filteredData: Alert[]  = _.cloneDeep(data);
    if (activeFilters['Severity']) {
      const severityFilter = activeFilters['Severity'];
      filteredData = data.filter(a => severityFilter === a.Severity)
    }
    if (activeFilters['Protocol']) {
      const protocolFilter = activeFilters['Protocol'];
      filteredData = filteredData.filter(a => protocolFilter === a.Protocol)
    }
    if (activeFilters['ClientIP']) {
      const clientIPFilter = activeFilters['ClientIP'];
      filteredData = filteredData.filter(a => clientIPFilter === a.ClientIP)
    }
    if (activeFilters['ClientCountry']) {
      const countryFilter = activeFilters['ClientCountry'];
      filteredData = filteredData.filter(a => countryFilter === a.ClientCountry)
    }
    return filteredData;
  }

  reset() {
    this.activeFilters = {};
    this.allAlerts = _.cloneDeep(this.originalAllAlerts);
  }

  isFilterActive(): boolean {
    return _.isEmpty(this.activeFilters);
  }

}
