import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private env = environment;

  constructor(private requestService: RequestService) { }

  /*--wish--*/

  private _triggerWish = new Subject<string>();

  get triggerWish() {
    return this._triggerWish.asObservable();
  }

  public triggerWishOnStorage(text: string) { 
    this._triggerWish.next(text);
  }

  /*--cart--*/
  private _trigger = new Subject<Array<DishModel>>();

  get trigger() {
    return this._trigger.asObservable();
  }

  public triggerOnStorage(order: Array<DishModel>) { 
    this._trigger.next(order);
  }

  public readOrder(storeName: string = "_order"): Array<DishModel> {
    let order = new Array<DishModel>();
    let orderFromStorage = localStorage.getItem(storeName);

    if (orderFromStorage !== null && orderFromStorage !== undefined && orderFromStorage !== "") {
      order = JSON.parse(orderFromStorage);
    }

    return order;
  }

  public writeOrder(order: Array<DishModel>, storeName: string = "_order"): void {
    localStorage.setItem(storeName, JSON.stringify(order));
    
    if (storeName == "_order") {
      this.triggerOnStorage(order);
    } else {
      this.triggerWishOnStorage("Страву було додано до списку бажань!");
    }
  }

  public GetDishQuantity(dishId: number): number {
    let order = this.readOrder();
    let dish = order.find(d => d.id == dishId);

    if (dish)
      return dish.quantity;
    
    return 0;
  }

  public saveOrderById(dishId: number, quantity: number = 1, storeName: string = "_order"): void {
    let order = this.readOrder(storeName);
    let dish = order.find(d => d.id == dishId);

    if (dish) {
      if (dish.quantity + quantity > 0 && dish.quantity + quantity <= this.env.maxDishesQuan) {
        this.saveOrder(dish, quantity, storeName);
      }
    }
  }

  public saveOrder(dish: DishModel, quantity: number = 1, storeName: string = "_order"): void {
    let order = this.readOrder(storeName);

    let thisDish = order.find(d => d.id == dish.id);

    if (thisDish != null && thisDish != undefined) {
      thisDish.quantity = thisDish.quantity + quantity;
    } else {
      if (!dish.quantity) {
        dish.quantity = 1;
      }
      order.push(dish);
    }

    this.writeOrder(order, storeName);
  }

  public saveOrderdDish(dish: DishModel) {
    let order = this.readOrder();

    let thisDish = order.find(d => d.id == dish.id);

    if (thisDish != null && thisDish != undefined) {
      thisDish.quantity = dish.quantity;
    } else {
      if (!dish.quantity) {
        dish.quantity = 1;
      }
      order.push(dish);
    }

    this.writeOrder(order);
  }

  public deleteOrderedDish(dishId: number, storeName: string = "_order") {
    let order = this.readOrder(storeName);

    let thisDish = order.findIndex(d => d.id == dishId);

    if (thisDish != null && thisDish != undefined && thisDish != -1) {
      order.splice(thisDish, 1);
    }

    this.writeOrder(order, storeName);
  }

  public sendOrder(): void {
    let order = this.readOrder();

    if (order && order.length > 0) {
      let orderToSend: any = {};

      order.forEach(d => { orderToSend[d.id] = d.quantity });

      this.requestService.post<any>("api/order/saveorder",
      {
        "Email": "test@gmail.com",
        "DishesIds": orderToSend
      }).subscribe(res => {
        localStorage.removeItem("_order");
        this.triggerOnStorage(new Array<DishModel>());
      });
    }
  }
}
