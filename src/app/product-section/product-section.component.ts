import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent implements OnInit {

  @Input() title: string = "";
  @Input() dishes: Array<DishModel> = new Array<DishModel>();

  env = environment;

  constructor() { }

  ngOnInit(): void {
  }

}
