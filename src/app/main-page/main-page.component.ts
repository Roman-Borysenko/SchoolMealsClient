import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IngredientModel } from '../category-page/category-page.component';
import { RequestService } from '../services/request.service';
import { CategoryModel } from '../_layout/app-layout/app-layout.component';

export interface DishModel {
  id: number,
  name: string;
  slug: string;
  dishUrlSections: string[];
  description: string;
  image: string;
  tags: Array<TagModel>;
  ingredients: Array<IngredientModel>;
  category: CategoryModel;

  quantity: number; // field for cart
}

export interface TagModel {
  name: string;
  slug: string;
}

export interface ArticleModel {
  title: string,
  slug: string,
  text: string,
  image: string,
  authorName: string,
  updateAt: Date
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

  recommendedDishesForUserTitle: string = "Рекомендовані страви відповідно до вашого здоров'я";
  recommendedDishesForUser: Array<DishModel> = new Array<DishModel>();

  blogArticlesTitle: string =  "Статті з Блогу";
  blogArticles: Array<Array<ArticleModel>> = new Array<Array<ArticleModel>>();
  
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

    // get the list of recommended dishes for user
    this.requestService.get<Array<DishModel>>("api/dish/getrecommendeddishesfotuser?take=4&lang=" + this.env.language).subscribe(res => { 
      this.recommendedDishesForUser = res;
    });

    // get list of article for blog
    this.requestService.get<Array<ArticleModel>>("api/blog/getarticles?skip=0&take=4&lang=" + this.env.language).subscribe(res => { 
      this.blogArticles = this.chunk(res, 2);
    });
  }

  chunk(array: Array<any>, size: number): Array<Array<any>> {
    var i = 0, j = array.length;
    var temparray = new Array<Array<any>>();

    for (; i<j; i+=size) {
      temparray.push(array.slice(i,i+size));
    }

    return temparray;
  }

}
