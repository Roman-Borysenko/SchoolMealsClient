import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { CartService } from '../services/cart.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  env = environment;

  private urlParams: Params = {};
  breadcrumbs: Array<{[key: string]:  Array<string>}> = new Array<{[key: string]:  Array<string>}>();
  dish: DishModel = {} as DishModel;
  images: string[] = [];

  dishesFromCategoryTitle: string = "Рекомендовані страви із категорії";
  dishesFromCategory: Array<DishModel> = new Array<DishModel>();

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.urlParams = params;
    });

    this.requestService.get<DishModel>("api/dish/getdish?categorySlug=" + this.urlParams.category + "&subcategorySlug=" + this.urlParams.subcategory + "&dishSlug=" + this.urlParams.product + "&lang=" + this.env.language)
      .subscribe(res => {
        this.dish = res;
        this.images = res.image.split("|");

        this.genBreadcrumbs();
      });
    
    this.requestService.get<Array<DishModel>>("api/dish/getrecommendeddishesfromcategory?categorySlug=" + (this.urlParams.subcategory == "dish" ? this.urlParams.category : this.urlParams.subcategory) + "&take=4&lang=" + this.env.language)
      .subscribe(res => {
        this.dishesFromCategory = res;
      });
  }

  private genBreadcrumbs() {
    this.requestService.get<Array<{[key: string]: Array<string>}>>("api/category/getbreadcrumbs?categorySlug=" + this.urlParams.category + (this.urlParams.subcategory ? "&subcategorySlug=" + this.urlParams.subcategory : "")).subscribe(res => {
      this.breadcrumbs = res;
      this.breadcrumbs.push({key: [this.dish.name], value: this.breadcrumbs[this.breadcrumbs.length - 1].value.concat([this.dish.slug])});
    });
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
