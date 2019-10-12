import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { Color } from 'ng2-charts';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CategoryTreeComponent } from '../category-tree/category-tree.component';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css'],
  entryComponents: [ CategoryTreeComponent ]
})
export class CategoryDisplayComponent implements OnInit {

  @Input() category: Category;
  @Input() color: Color;

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openCategorySelection() {
    this._bottomSheet.open(CategoryTreeComponent);
  }

}
