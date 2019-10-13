import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';

import { DataChartComponent } from './components/data-chart/data-chart.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { ChartsModule } from 'ng2-charts';
import { CategoryDisplayComponent } from './components/category-display/category-display.component';
import { CategoryBlockComponent } from './components/category-block/category-block.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { ChartAverageComponent } from './components/chart-average/chart-average.component';
import { DataViewComponent } from './components/data-view/data-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DataChartComponent,
    DateSelectorComponent,
    CategoryDisplayComponent,
    CategoryBlockComponent,
    CategoryTreeComponent,
    ChartAverageComponent,
    DataViewComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule,
    ChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatTabsModule
  ],
  entryComponents: [CategoryTreeComponent],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
