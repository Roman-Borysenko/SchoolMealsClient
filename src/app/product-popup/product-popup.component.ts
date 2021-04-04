import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';

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

  constructor() {
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
}
