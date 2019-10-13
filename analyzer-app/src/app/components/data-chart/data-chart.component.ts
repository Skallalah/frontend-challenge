import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [{}];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false,
    }
  };
  public lineChartColors: Color[] = this.dataService.lineChartColors;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  private dataSubscription: Subscription;
  private dateSubscription: Subscription;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.dataSubscription = this.dataService.data.subscribe(volumes => this.lineChartData = volumes);
    this.dateSubscription = this.dataService.date.subscribe(date => this.lineChartLabels = date);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
  }


}
