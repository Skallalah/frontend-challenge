import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.css']
})
export class CategoryDisplayComponent implements OnInit {

  @Input() category: Category;
  @Input() color: Color;

  constructor() { }

  ngOnInit() {
  }

}
