import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "src/environments/environment";
import { ArticlePageComponent } from "./article-page/article-page.component";
import { BlogPageComponent } from "./blog-page/blog-page.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { AdminLayoutComponent } from "./_layout/admin-layout/admin-layout.component";
import { AppLayoutComponent } from "./_layout/app-layout/app-layout.component";
import { IndexComponent } from "./admin/index/index.component";


const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "", component: IndexComponent },
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: "", redirectTo: environment.language, pathMatch: "full"},
      { path: ":lang", component: MainPageComponent },
      { path: ":lang/login", component: LoginPageComponent },
      { path: ":lang/cart", component: CartPageComponent },
      { path: ":lang/blog", component: BlogPageComponent },
      { path: ":lang/blog/:slug", component: ArticlePageComponent },
      { path: ":lang/:category", component: CategoryPageComponent },
      { path: ":lang/:category/:subcategory", component: CategoryPageComponent },
      { path: ":lang/:category/:subcategory/:product", component: ProductPageComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}