import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faThLarge, faThList, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { RequestService } from '../services/request.service';


export interface IngredientModel {
  id: number,
  name: string,
  slug: string,

  isSelect: boolean
}

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  private urlParams: Params = {};
  lock: boolean = false;

  env = environment;

  faThLarge = faThLarge;
  faThList = faThList;
  faSpinner = faSpinner;

  isGrid: boolean = true;

  breadcrumbs: Array<{[key: string]:  Array<string>}> = new Array<{[key: string]:  Array<string>}>();
  dishes: Array<DishModel> = new Array<DishModel>();
  ingredients: Array<IngredientModel> = new Array<IngredientModel>();

  take: number = 9;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.urlParams = params;
      this.getDishesByCategory();
    });

    this.requestService.get<Array<IngredientModel>>(
      "api/ingredient/getall?lang=" + this.env.language)
      .subscribe(res => { 
        this.ingredients = res;
      });
    
    this.requestService.get<Array<{[key: string]: Array<string>}>>("api/category/getbreadcrumbs?categorySlug=" + this.urlParams.category + (this.urlParams.subcategory ? "&subcategorySlug=" + this.urlParams.subcategory : "")).subscribe(res => {
      this.breadcrumbs = res;
    });
  }

  private getDishesByCategory(): void {
    if (!this.lock) {
      this.lock = true;
      this.requestService.get<Array<DishModel>>(
        "api/dish/getbycategory/?lang=" + this.env.language + "&categorySlug=" + this.urlParams.category + (this.urlParams.subcategory ? "&subcategorySlug=" + this.urlParams.subcategory : "")
        + "&skip=" + 0 + "&take=" + this.take)
        .subscribe(res => { 
          this.dishes = res;
          this.lock = false;
        });
    }
  }

  private getDishesByFilter() {
    if (!this.lock) {
      this.lock = true;
      this.requestService.post<Array<DishModel>>("api/dish/getbyfilter",
      {
        "CategorySlug": this.urlParams.category,
        "SubcategorySlug": this.urlParams.subcategory,
        "Lang": this.env.language,
        "Skip": this.dishes.length,
        "Take": this.take,
        "IngredientsIds": Array.from(this.ingredients.filter(i => i.isSelect == true), i => i.id)
      })
      .subscribe(res => { 
        this.dishes = this.dishes.concat(res);
        this.lock = false;
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (pageYOffset > document.body.scrollHeight - document.body.clientHeight * 2) {
      this.getDishesByFilter();
    }
  }

  loadDishes($event: any): void {
    this.getDishesByFilter();
  }

  selectIngredient(id: number): void {
    let ingredient = this.ingredients.find(i => i.id == id);
    
    if (ingredient) {
      ingredient.isSelect = !ingredient.isSelect;
    }

    this.dishes = [];
    this.getDishesByFilter();
  }
}
