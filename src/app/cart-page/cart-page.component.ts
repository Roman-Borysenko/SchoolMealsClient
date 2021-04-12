import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  env = environment;

  faTrashAlt = faTrashAlt;
  dishes: Array<DishModel> = new Array<DishModel>();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.trigger.subscribe((order) => { this.dishes = order });

    this.dishes = this.cartService.readOrder();
  }

  onIncrease(dishId: number): void {
    this.cartService.saveOrderById(dishId);
  }

  onDecrease(dishId: number): void {
    this.cartService.saveOrderById(dishId, -1);
  }

  deleteOrderedDish(dishId: number): void {
    this.cartService.deleteOrderedDish(dishId);
  }

  confirmOrder(): void {
    this.cartService.sendOrder();
  }

}
