import {Component, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Alert } from 'src/app/models/model.alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() category = '';
  @Input() title = '';
  @Input() data: Alert[] = [];
  @Output() selectCategory = new EventEmitter<{}>();

  categoryData: any = {};

  ngOnChanges(changes: SimpleChanges) {
    this.categoryData = {};
    this.data.forEach(a => {
      const newAlert = Object.create(a);
      const displayBy = this.category && newAlert[this.category];
      if (displayBy && this.categoryData[displayBy]) {
        this.categoryData[displayBy] = this.categoryData[displayBy] + 1;
      } else if (displayBy) {
        this.categoryData[displayBy] = 1;
      }
    })
  }

  filterBy(value: any) {
    this.selectCategory.emit({
      category: this.category,
      value,
    })
  }

}
