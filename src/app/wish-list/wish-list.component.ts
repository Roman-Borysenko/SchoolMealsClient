import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  env = environment;

  faTrashAlt = faTrashAlt;
  dishes: Array<DishModel> = new Array<DishModel>();

  breadcrumbs: Array<{[key: string]:  Array<string>}> = new Array<{[key: string]:  Array<string>}>();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.dishes = this.cartService.readOrder("_wish");
    this.breadcrumbs.push({ key: ["Список побажань"], value: ["wish-list"] });
  }

  onIncrease(dishId: number): void {
    this.cartService.saveOrderById(dishId, 1, "_wish");
    this.dishes = this.cartService.readOrder("_wish");
  }

  onDecrease(dishId: number): void {
    this.cartService.saveOrderById(dishId, -1, "_wish");
    this.dishes = this.cartService.readOrder("_wish");
  }

  toCart(dish: DishModel): void {
    this.cartService.saveOrder(dish);
    this.dishes = this.cartService.readOrder("_wish");
  }

  deleteWishDish(dishId: number): void {
    this.cartService.deleteOrderedDish(dishId, "_wish");
    this.dishes = this.cartService.readOrder("_wish");
  }
}
