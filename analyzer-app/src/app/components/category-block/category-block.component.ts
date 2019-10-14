import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { Color } from 'ng2-charts';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.css']
})
export class CategoryBlockComponent implements OnInit, OnDestroy {

  categories: Category[];
  subscription: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscription = this.dataService.currentCategory.subscribe(category => category.length > 0 ? this.categories = category : []);
  }

  getColorByCategory(category: Category): Color {
    return this.dataService.getColorByCategory(category);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addCategory() {
    this.dataService.addCategory();
  }

  removeCategory() {
    this.dataService.removeCategory();
  }

}
