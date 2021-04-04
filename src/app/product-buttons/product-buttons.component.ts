import { Component, Input, OnInit } from '@angular/core';
import { faEye, faShoppingBasket, faHeart } from '@fortawesome/free-solid-svg-icons';
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

  @Input() dishUrl: string[] = [];

  constructor(private forwardingMessages: ForwardingMessagesService) { }

  ngOnInit(): void {
  }

  onShowPopup($event: any, dishUrl: string[]): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.forwardingMessages.triggerOnShowPopup(dishUrl);
  }

}
