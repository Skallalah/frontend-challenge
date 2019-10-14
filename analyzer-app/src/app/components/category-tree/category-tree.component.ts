import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Category } from 'src/app/models/category/category';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css']
})
export class CategoryTreeComponent implements OnInit, OnDestroy {

  currentCategory: Category;
  currentNode: Category;
  rootNode: Category;
  parentNodes: Category[] = [];

  apiSubscription: Subscription;
  dataSubscription: Subscription;

  constructor(private _bottomSheetRef: MatBottomSheetRef<CategoryTreeComponent>, private dataService: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.apiSubscription = this.apiService.getRootCategory().subscribe(values => {
      this.currentNode = values;
      this.rootNode = values;
    });
    this.dataSubscription = this.dataService.currentCategory.subscribe(value => this.currentCategory = value);
  }

  hasNodeParent(): boolean {
    return (this.parentNodes.length != 0);
  }

  goToParent() {
    this.currentNode = this.parentNodes.pop();
  }

  selectedNode(node: Category) {
    this.dataService.updateCategory(node);
  }

  nextCategoryNode(node: Category) {
    this.parentNodes.push(this.currentNode);
    this.currentNode = node;
  }

  isNotSelectionable(node: Category): boolean {
    return this.currentCategory.id === node.id;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.apiSubscription.unsubscribe();
  }

}
