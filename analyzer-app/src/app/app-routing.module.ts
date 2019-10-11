import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataChartComponent } from './components/data-chart/data-chart.component';


const routes: Routes = [
  { path: 'chart', component: DataChartComponent },
  { path: '',
    redirectTo: '/chart',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
