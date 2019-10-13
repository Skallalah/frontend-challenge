import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DataChartComponent } from './components/data-chart/data-chart.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { ChartsModule } from 'ng2-charts';
import { CategoryDisplayComponent } from './components/category-display/category-display.component';
import { CategoryBlockComponent } from './components/category-block/category-block.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { ChartAverageComponent } from './components/chart-average/chart-average.component';
import { DataViewComponent } from './components/data-view/data-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { TokenInterceptor } from './guard/token-interceptor/token-interceptor.service';
import { MockBackendInterceptor } from './mock_backend/mock-backend-interceptor.service';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';


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
    LoginViewComponent,
    DashboardViewComponent,
    MainToolbarComponent,
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
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  entryComponents: [CategoryTreeComponent],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
