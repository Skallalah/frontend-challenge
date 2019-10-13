import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCategories().subscribe(data => this.dataService.applyCategory(data));
  }

}
