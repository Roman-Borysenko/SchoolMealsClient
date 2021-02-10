import { Component, OnInit } from '@angular/core';
import { faEye, faShoppingBasket, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent implements OnInit {

  faEye = faEye;
  faShoppingBasket = faShoppingBasket;
  faHeart = faHeart;

  constructor() { }

  ngOnInit(): void {
  }

}
