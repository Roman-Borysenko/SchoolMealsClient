import { Component, ComponentFactoryResolver, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DishModel } from './main-page/main-page.component';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ForwardingMessagesService } from './services/forwarding-messages.service';
import { RequestService } from './services/request.service';

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
  dish: DishModel = {} as DishModel;

  constructor(
    private forwardingMessages: ForwardingMessagesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private requestService: RequestService,
    private router : Router
  ) { 
    
  }

  ngOnInit(): void {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => { return false };
    this.forwardingMessages.trigger.subscribe((dishUrl) => this.onShowPopup(dishUrl));
  }

  private getDish(dishUrl: string[], callbeck: Function | undefined): void {
    this.requestService.get<DishModel>("api/dish/getdish?categorySlug=" + dishUrl[0] + "&subcategorySlug=" + (dishUrl[1] ? dishUrl[1] : "") + "&dishSlug=" + dishUrl[2] + "&lang=" + this.env.language)
      .subscribe(res => {
        this.dish = res;

        if(callbeck)
          callbeck();
      });
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    if (event.target.innerWidth > 1100) {
      
    }
  }
}
