import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-average',
  templateUrl: './chart-average.component.html',
  styleUrls: ['./chart-average.component.css']
})
export class ChartAverageComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      },
      ],
    },
    legend: {
      display: false,
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartColors: Color[] = this.dataService.lineChartColors;
  textPlugin: any;

  private dataSubscription: Subscription;
  private dateSubscription: Subscription;

  public barChartData: ChartDataSets[] = [{}];

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.dataSubscription = this.dataService.averageData.subscribe(values => this.barChartData = values);
    this.dateSubscription = this.dataService.averageDate.subscribe(values => this.barChartLabels = values);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
  }

}
