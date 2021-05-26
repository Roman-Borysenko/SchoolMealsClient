import { NgModule, Provider } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { IndexComponent } from './admin/index/index.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableComponent } from './admin/datatable/datatable.component';
import { FormComponent } from './admin/form/form.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { WishListComponent } from './wish-list/wish-list.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';

const INTERCEPTOR_PROVIDR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

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
    BreadCrumbsComponent,
    AppLayoutComponent,
    AdminLayoutComponent,
    IndexComponent,
    DatatableComponent,
    FormComponent,
    WishListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    OwlModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgxImageZoomModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule,
    NgbModule,
    CKEditorModule
  ],
  providers: [INTERCEPTOR_PROVIDR],
  bootstrap: [AppComponent]
})
export class AppModule { }
