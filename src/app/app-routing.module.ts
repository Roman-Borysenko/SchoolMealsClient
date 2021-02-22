import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticlePageComponent } from "./article-page/article-page.component";
import { BlogPageComponent } from "./blog-page/blog-page.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";


const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "cart", component: CartPageComponent },
  { path: "blog", component: BlogPageComponent },
  { path: "blog/:slug", component: ArticlePageComponent },
  { path: ":slug", component: CategoryPageComponent },
  { path: ":category/:subcategory", component: CategoryPageComponent },
  { path: ":category/:slug/:product", component: ProductPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}