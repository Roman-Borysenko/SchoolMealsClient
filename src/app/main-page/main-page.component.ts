import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IngredientModel } from '../category-page/category-page.component';
import { RequestService } from '../services/request.service';

export interface DishModel {
  id: number,
  name: string;
  slug: string;
  dishUrlSections: string[];
  description: string;
  image: string;
  tags: Array<TagModel>;
  ingredients: Array<IngredientModel>;

  quantity: number; // field for cart
}

export interface TagModel {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @Output('activate') activateEvents: EventEmitter<any> = new EventEmitter<any>();

  env = environment;

  newDishesTitle: string = "Новинки меню";
  newdDishes: Array<DishModel> = new Array<DishModel>();

  recommendedDishesTitle: string = "Рекомендовані страви";
  recommendedDishes: Array<DishModel> = new Array<DishModel>();
  
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    // get the list of new dishes
    this.requestService.get<Array<DishModel>>("api/dish/getnewdishes?take=4&lang=" + this.env.language).subscribe(res => { 
      this.newdDishes = res;
    });

    // get the list of recommended dishes
    this.requestService.get<Array<DishModel>>("api/dish/getrecommendeddishes?take=4&lang=" + this.env.language).subscribe(res => { 
      this.recommendedDishes = res;
    });
  }

}
