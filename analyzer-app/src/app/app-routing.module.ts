import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartAverageComponent } from './components/chart-average/chart-average.component';
import { DataChartComponent } from './components/data-chart/data-chart.component';
import { DataViewComponent } from './components/data-view/data-view.component';


const routes: Routes = [
  { path: 'chart', component: DataViewComponent },
  { path: 'average', component: ChartAverageComponent },
  {
    path: '',
    redirectTo: '/chart',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
