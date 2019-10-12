import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data/data.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DateSelectorComponent implements OnInit {

  beginDate = new FormControl(moment());
  endDate = new FormControl(moment());
  maxDate: Date = new Date();
  minDate: Date = new Date();
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.beginningDate.subscribe({ next: date => this.beginDate.setValue(moment(date)) });
    this.dataService.endingDate.subscribe({ next: date => this.endDate.setValue(moment(date)) });
    this.dataService.maxDate.subscribe({ next: date => this.maxDate = date });
    this.dataService.minDate.subscribe({ next: date => this.minDate = date });
  }

  chosenBeginYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.beginDate.value;
    ctrlValue.year(normalizedYear.year());
    this.beginDate.setValue(ctrlValue);
    this.dataService.updateBeginningDate(ctrlValue);
  }

  chosenEndYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.endDate.value;
    ctrlValue.year(normalizedYear.year());
    this.endDate.setValue(ctrlValue);
    this.dataService.updateEndingDate(ctrlValue);
  }

  chosenBeginMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.beginDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.beginDate.setValue(ctrlValue);
    this.dataService.updateBeginningDate(ctrlValue);
    datepicker.close();
  }

  chosenEndMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.endDate.setValue(ctrlValue);
    this.dataService.updateEndingDate(ctrlValue);
    datepicker.close();
  }

}
