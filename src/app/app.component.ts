import { Component, ComponentFactoryResolver, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ForwardingMessagesService } from './services/forwarding-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('productPopup', { read: ViewContainerRef }) productPopup: any;
  productPopupComponentRef: any = null;

  title = 'SchoolMeals';
  showSlider = false;
  
  categories: Array<Array<any>> = new Array(new Array(0), new Array(4), new Array(0), new Array(3), new Array(7), new Array(10));
  cartProducts: Array<any> = new Array(6);

  constructor(
    private forwardingMessages: ForwardingMessagesService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    console.log("appcomponent ctor");
  }

  ngOnInit(): void {
    this.forwardingMessages.trigger.subscribe(() => this.onShowPopup());
    console.log("appcomponent ngOnInit");
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
    if (window.location.pathname == '/') {
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
