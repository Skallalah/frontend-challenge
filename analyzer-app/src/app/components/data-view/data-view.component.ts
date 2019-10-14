import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  subscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

}
