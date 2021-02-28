import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent implements OnInit {

  isShow: boolean = false;

  product: any;

  constructor() { }

  ngOnInit(): void {
  }

}
