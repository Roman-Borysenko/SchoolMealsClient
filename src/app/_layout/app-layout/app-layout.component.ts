import { Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DishModel } from 'src/app/main-page/main-page.component';
import { ProductPopupComponent } from 'src/app/product-popup/product-popup.component';
import { CartService } from 'src/app/services/cart.service';
import { ForwardingMessagesService } from 'src/app/services/forwarding-messages.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { faSignOutAlt, faHeart, faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

export interface LanguageModel {
  id: number;
  name: string;
  slug: string;
  nameAbbreviation: string;
  default: boolean;
}

export interface CategoryModel {
  slug: string;
  name: string;
  categories: Array<CategoryModel>;
  parentCategory: CategoryModel;
}

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faHeart = faHeart;
  faCog = faCog;
  faCheck = faCheck;

  @ViewChild('productPopup', { read: ViewContainerRef }) productPopup: any;
  productPopupComponentRef: any = null;

  env = environment;
  isAdmin: boolean = false;
  messageText: string = "";

  title = 'SchoolMeals';
  showSlider = false;
  dish: DishModel = {} as DishModel;

  categories: Array<CategoryModel> = Array<CategoryModel>();
  languages: Array<LanguageModel> = new Array<LanguageModel>();
  cartDish: Array<DishModel> = new Array<DishModel>();

  constructor(
    private forwardingMessages: ForwardingMessagesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private requestService: RequestService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forwardingMessages.trigger.subscribe((dishUrl) => this.onShowPopup(dishUrl));
    this.cartService.trigger.subscribe((order) => { this.cartDish = order; this.showMessage("Страву было додано до замовлення!") });
    this.cartService.triggerWish.subscribe((text) => { this.showMessage(text) });

    this.cartDish = this.cartService.readOrder();

    // get the list of languages
    this.requestService.get<Array<LanguageModel>>("api/language").subscribe(res => { 
      this.languages = res;
    });

    // get the list of categories
    this.requestService.get<Array<CategoryModel>>("api/category/getmaincategories?lang=" + this.env.language).subscribe(res => { 
      this.categories = res;
    });

    // check is user admin
    let user = localStorage.getItem("_auth");
    if (user !== null && user !== undefined && user !== "")
      this.isAdmin = JSON.parse(user).isAdmin;
  }

  showMessage(text: string): void {
    this.messageText = text;

    setTimeout(() => {
      this.messageText = "";
    }, 3000);
  }

  private getDish(dishUrl: string[], callbeck: Function | undefined): void {
    this.requestService.get<DishModel>("api/dish/getdish?categorySlug=" + dishUrl[0] + "&subcategorySlug=" + (dishUrl[1] ? dishUrl[1] : "") + "&dishSlug=" + dishUrl[2] + "&lang=" + this.env.language)
      .subscribe(res => {
        this.dish = res;

        if(callbeck)
          callbeck();
      });
  }

  onLangClick(event: any) {
    if (event.target.innerText) {
      this.env.language = event.target.innerText.toLowerCase();
      event.target.parentElement.parentElement.querySelector(".active").removeAttribute("class");
      event.target.className = "active";

      this.ngOnInit();
      // this.router.navigateByUrl("/"+this.env.language.toLowerCase());
    }
  }

  onShowPopup(dishUrl: string[]): void {
    if (this.productPopupComponentRef == null) {
      this.productPopup.clear();

      let productPopupComponent = this.componentFactoryResolver.resolveComponentFactory(ProductPopupComponent);
      this.productPopupComponentRef = this.productPopup.createComponent(productPopupComponent);
    }

    this.getDish(dishUrl, () => {
        let ppc = (<ProductPopupComponent>(this.productPopupComponentRef.instance));
        ppc.dish = this.dish;
        ppc.images = this.dish.image.split('|');
        ppc.isShow = true;
    });
  }

  onActivate(flag: any): void {
    if (window.location.pathname.match("^/[a-zA-Z]{2}$")?.length == 1) {
      this.showSlider = true;
    } else {
      this.showSlider = false;
    }
    console.log(flag);
  }

  deleteOrderedDish(dishId: number): void {
    this.cartService.deleteOrderedDish(dishId);
  }

  confirmOrder(): void {
    this.cartService.sendOrder();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    if (event.target.innerWidth > 1100) {
      
    }
  }

  onLogout(): void {
    localStorage.removeItem("_auth");
    this.router.navigate(['/login']);
  }
}
