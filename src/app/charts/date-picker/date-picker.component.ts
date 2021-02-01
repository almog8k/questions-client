import { Component } from '@angular/core';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  date = null;


constructor(private chartService:ChartService) {}

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    this.chartService.selectedDates.next(result);
  }
}
