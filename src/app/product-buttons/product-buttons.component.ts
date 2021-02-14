import { Component, OnInit } from '@angular/core';
import { faEye, faShoppingBasket, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-buttons',
  templateUrl: './product-buttons.component.html',
  styleUrls: ['./product-buttons.component.css']
})
export class ProductButtonsComponent implements OnInit {

  faEye = faEye;
  faShoppingBasket = faShoppingBasket;
  faHeart = faHeart;

  constructor() { }

  ngOnInit(): void {
  }

}
