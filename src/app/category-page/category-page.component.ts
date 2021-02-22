import { Component, OnInit } from '@angular/core';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  faThLarge = faThLarge;
  faThList = faThList;

  isGrid: boolean = true;

  products: Array<any> = new Array(10);

  constructor() { }

  ngOnInit(): void {
  }

}
