import { Component, Input, OnInit } from '@angular/core';
import { faEye, faShoppingBasket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { DishModel } from '../main-page/main-page.component';
import { CartService } from '../services/cart.service';
import { ForwardingMessagesService } from '../services/forwarding-messages.service';

@Component({
  selector: 'app-product-buttons',
  templateUrl: './product-buttons.component.html',
  styleUrls: ['./product-buttons.component.css']
})
export class ProductButtonsComponent implements OnInit {

  faEye = faEye;
  faShoppingBasket = faShoppingBasket;
  faHeart = faHeart;

  @Input() dish: DishModel = {} as DishModel;

  constructor(
    private forwardingMessages: ForwardingMessagesService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  onShowPopup($event: any, dishUrl: string[]): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.forwardingMessages.triggerOnShowPopup(dishUrl);
  }

  toCart($event: any): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.cartService.saveOrder(this.dish);
  }

}
