import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SchoolMeals';
  showSlider = false;
  
  categories: Array<Array<any>> = new Array(new Array(0), new Array(4), new Array(0), new Array(3), new Array(7), new Array(10));
  cartProducts: Array<any> = new Array(6);

  constructor() { 
    console.log("appcomponent ctor");
  }

  ngOnInit(): void {
    console.log("appcomponent ngOnInit");
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
