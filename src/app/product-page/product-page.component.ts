import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DishModel } from '../main-page/main-page.component';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  env = environment;

  private urlParams: Params = {};
  dish: DishModel = {} as DishModel;
  images: string[] = [];

  dishesFromCategoryTitle: string = "Рекомендовані страви із категорії";
  dishesFromCategory: Array<DishModel> = new Array<DishModel>();

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => { 
      this.urlParams = params;
    });

    this.requestService.get<DishModel>("api/dish/getdish?categorySlug=" + this.urlParams.category + "&subcategorySlug=" + this.urlParams.subcategory + "&dishSlug=" + this.urlParams.product + "&lang=" + this.env.language)
      .subscribe(res => {
        this.dish = res;
        this.images = res.image.split("|");
      });
    
    this.requestService.get<Array<DishModel>>("api/dish/getrecommendeddishesfromcategory?categorySlug=" + (this.urlParams.subcategory == "dish" ? this.urlParams.category : this.urlParams.subcategory) + "&take=4&lang=" + this.env.language)
      .subscribe(res => {
        this.dishesFromCategory = res;
      });
  }

}
