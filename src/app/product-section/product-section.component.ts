import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent implements OnInit {

  products: Array<any> = new Array(4);

  constructor() { }

  ngOnInit(): void {
  }

}
