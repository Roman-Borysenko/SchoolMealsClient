import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { CartService } from '../services/cart.service';

export enum Properties {
  Ingredients,
  Tags
}

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent implements OnInit {

  env = environment;
  public Properties: typeof Properties = Properties;

  isShow: boolean = false;

  dish: DishModel = {} as DishModel;
  images: string[] = [];

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
  }

  checkProperty(property: Properties): boolean {
    let res: boolean = false;

    switch (property) {
      case Properties.Ingredients: res = this.dish.ingredients.length > 0; break;
      case Properties.Tags: res = this.dish.tags.length > 0; break;
    }

    return res;
  }

  onIncrease(): void {
    if (this.dish.quantity < this.env.maxDishesQuan) {
      this.dish.quantity++;
    }
  }

  onDecrease(): void {
    if (this.dish.quantity > 1 ) {
      this.dish.quantity--;
    }
  }

  saveOrder(): void {
    this.cartService.saveOrderdDish(this.dish);
  }

  isDishQuantityNan(): boolean {
    if (!this.dish.quantity) {
      let quantity = this.cartService.GetDishQuantity(this.dish.id);

      if (quantity == 0) {
        this.dish.quantity = 1;
      } else {
        this.dish.quantity = quantity;
      }
    }

    return true;
  }
}
