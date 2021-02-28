import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductSectionComponent } from './product-section/product-section.component';
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { OwlModule } from 'ngx-owl-carousel';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ProductButtonsComponent } from './product-buttons/product-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductSectionComponent,
    OwlCarouselComponent,
    MainPageComponent,
    ProductPageComponent,
    CategoryPageComponent,
    LoginPageComponent,
    CartPageComponent,
    BlogPageComponent,
    ArticlePageComponent,
    ProductButtonsComponent,
    BlogSectionComponent,
    ProductPopupComponent,
    BreadCrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    OwlModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgxImageZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
