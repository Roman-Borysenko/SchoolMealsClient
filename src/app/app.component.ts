import { Component, ComponentFactoryResolver, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ForwardingMessagesService } from './services/forwarding-messages.service';
import { RequestService } from './services/request.service';

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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('productPopup', { read: ViewContainerRef }) productPopup: any;
  productPopupComponentRef: any = null;

  env = environment;

  title = 'SchoolMeals';
  showSlider = false;
  
  categories: Array<CategoryModel> = Array<CategoryModel>();
  languages: Array<LanguageModel> = new Array<LanguageModel>();
  cartProducts: Array<any> = new Array(6);

  constructor(
    private forwardingMessages: ForwardingMessagesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private requestService: RequestService,
    private router : Router
  ) { 
    
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false };

    this.forwardingMessages.trigger.subscribe(() => this.onShowPopup());

    // get the list of languages
    this.requestService.get<Array<LanguageModel>>("api/language").subscribe(res => { 
      this.languages = res;
    });

    // get the list of categories
    this.requestService.get<Array<CategoryModel>>("api/category/getall?lang=" + this.env.language).subscribe(res => { 
      this.categories = res;
    });
  }

  onShowPopup(): void {
    if (this.productPopupComponentRef == null) {
      this.productPopup.clear();

      let productPopupComponent = this.componentFactoryResolver.resolveComponentFactory(ProductPopupComponent);
      this.productPopupComponentRef = this.productPopup.createComponent(productPopupComponent);
    }

    let ppc = (<ProductPopupComponent>(this.productPopupComponentRef.instance));
    ppc.product = {
      title: "Cras Eget Augue",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat."
    };

    ppc.isShow = true;
  }

  onActivate(flag: any): void {
    if (window.location.pathname.match("^/[a-zA-Z]{2}$")?.length == 1) {
      this.showSlider = true;
    } else {
      this.showSlider = false;
    }
    console.log(flag);
  }

  onLangClick(event: any) {
    if (event.target.innerText) {
      this.env.language = event.target.innerText.toLowerCase();
      event.target.parentElement.parentElement.querySelector(".active").removeAttribute("class");
      event.target.className = "active";

      this.ngOnInit();
      this.router.navigateByUrl("/"+this.env.language.toLowerCase());
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    if (event.target.innerWidth > 1100) {
      
    }
  }
}
