import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  products: Array<any> = new Array(5);

  constructor() { }

  ngOnInit(): void {
  }

}
