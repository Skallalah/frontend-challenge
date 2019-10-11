import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { Color } from 'ng2-charts';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.css']
})
export class CategoryBlockComponent implements OnInit {

  categories: Category[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentCategory.subscribe(category => category != null ? this.categories = Array.of(category) : []);
  }

  getColorByCategory(category: Category): Color {
    return this.dataService.getColorByCategory(category);
  }

}
