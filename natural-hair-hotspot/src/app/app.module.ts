import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductService } from './service/product.service';
import { MyItemsComponent } from './component/my-items/my-items.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ReviewComponent } from './component/review/review.component';
import { SearchComponent } from './component/search/search.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './component/nav/nav.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path: 'my-items', component: MyItemsComponent},
  {path: 'products/:prodNum', component: ProductDetailsComponent},
  {path: 'products', component: SearchResultsComponent},
  {path: 'search', component: SearchComponent},
  {path: 'reviews/:prodNum', component: ReviewComponent},
  {path: 'reviews', component: ReviewComponent},
  {path: 'search/category/:id', component: SearchResultsComponent},
  {path: 'search/:keyword', component: SearchResultsComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full' },    //the default view is set to the Search component
  //{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MyItemsComponent,
    ProductDetailsComponent,
    ReviewComponent,
    SearchResultsComponent,
    SearchComponent,
    SignUpComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
