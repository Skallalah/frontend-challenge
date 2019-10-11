import { Injectable } from '@angular/core';
import { Volume } from '../../models/volume/volume';
import { Category } from '../../models/category/category';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { ApiService } from '../api/api.service';
import { Color } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* Observable sources for the components. */

  private dataSource: BehaviorSubject<Array<ChartDataSets>> = new BehaviorSubject([{}]);
  data = this.dataSource.asObservable();

  private dateSource: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
  date = this.dateSource.asObservable();

  private beginningDateSource: BehaviorSubject<Date> = new BehaviorSubject(moment().subtract(1, 'year').toDate());
  beginningDate = this.beginningDateSource.asObservable();

  private endingDateSource: BehaviorSubject<Date> = new BehaviorSubject(moment().toDate());
  endingDate = this.endingDateSource.asObservable();

  private maxDateSource: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  maxDate = this.maxDateSource.asObservable();

  private minDateSource: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  minDate = this.minDateSource.asObservable();

  private currentCategorySource: BehaviorSubject<Category> = new BehaviorSubject(null);
  currentCategory = this.currentCategorySource.asObservable();

  /* Chart colors values */

  lineChartColors: Color[] = [
    { // light red
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  /* End of chart colors values */

  constructor(private apiService: ApiService) {
  }

  /* Apply a category to the current chart, then updates the available month for the selectioned category. 
  Finally, updates the current chart by checking its previous boundaries are still valid.
  For now, only used in initialization */
  applyCategory(category: Category) {
    this.currentCategorySource.next(category)
    this.updateAvailableDates();
  }

  /* Check the availables dates from the current category, then apply those to the chart. 
  By default, it will selectioned the last 12 months from the last month available in the date. */
  private updateAvailableDates() {
    this.apiService.getDataByCategory(this.currentCategorySource.value.id).subscribe(
      {
        next: (data) => {
          const maxDate = moment(data[data.length - 1].timespan).toDate();
          const minDate = moment(data[0].timespan).toDate();
          let endingDate = this.endingDateSource.getValue();
          let beginningDate = this.beginningDateSource.getValue();

          /* Check if the last timestamp is before today. If so, will select this one as last date and recalculate the first date.*/
          if (moment(this.endingDateSource.getValue()).isAfter(maxDate)) {
            endingDate = maxDate;
            beginningDate = moment(maxDate).subtract(1, 'year').toDate();
          }

          /* Check if the the first date is available in the current data. If not, it will choose the first available date. */
          if (moment(this.beginningDateSource.getValue()).isBefore(minDate)) {
            beginningDate = minDate;
          }

          this.initializeData(data, beginningDate, endingDate);

          this.endingDateSource.next(endingDate);
          this.beginningDateSource.next(beginningDate);
          this.maxDateSource.next(maxDate);
          this.minDateSource.next(minDate);
        }
      });
  }

  private updateData() {
    this.apiService.getDataByCategory(this.currentCategorySource.value.id).subscribe({
      next: (data) => {
        this.initializeData(data, this.beginningDateSource.getValue(), this.endingDateSource.getValue());
      }
    });
  }

  /* Initialize chart data, by checking for each volume if it is inside the selected period. */
  private initializeData(data: Volume[], beginDate: Date, endingDate: Date) {
    let set = new Array<ChartDataSets>();
    let dateSet = new Array<string>();
    let numbers = new Array<number>();

    data.forEach((volume: Volume) => {
      if (moment(volume.timespan).isSameOrAfter(beginDate)
        && moment(volume.timespan).isSameOrBefore(endingDate)) {
        numbers.push(volume.volume);
        dateSet.push(moment(volume.timespan).format('MMMM YYYY'));
      }
    });
    set.push({ data: numbers, label: this.currentCategorySource.value.name })

    this.dataSource.next(set);
    this.dateSource.next(dateSet);
  }

  updateBeginningDate(newDate: Date) {
    this.beginningDateSource.next(newDate);
    this.updateData();
  }

  updateEndingDate(newDate: Date) {
    this.endingDateSource.next(newDate);
    this.updateData();
  }

  getColorByCategory(category: Category): Color {
    /* While there is only one category, return the first color of lineChartColors. 
    With multiple colors, find position of Category in the array of current categories, 
    then return the color at the same position in the array */
    return this.lineChartColors[0];
  }

}
