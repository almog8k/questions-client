import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartService } from '../services/chart.service';
import * as fromApp from 'src/app/store/app.reducer';
import { SetDates } from '../store/chart.actions';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  date = null;


  constructor(private store: Store<fromApp.AppState>) { }

  onChange(result: Date[]): void {
    this.store.dispatch(new SetDates(result));
  }
}
