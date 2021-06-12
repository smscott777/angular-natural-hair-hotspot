import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductService } from './service/product.service';
import { FavProductsComponent } from './component/fav-products/fav-products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ReviewComponent } from './component/review/review.component';
import { HomeComponent } from './component/home/home.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './component/nav/nav.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './component/login/login.component';

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs';

// To send jwt in header with every request.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + accessToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}

const routes: Routes = [
  {path: 'my-items', component: FavProductsComponent},
  {path: 'products/:prodNum', component: ProductDetailsComponent},
  {path: 'products', component: SearchResultsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'reviews/:prodNum', component: ReviewComponent},
  {path: 'reviews', component: ReviewComponent},
  {path: 'search/category/:id', component: SearchResultsComponent},
  {path: 'search/:keyword', component: SearchResultsComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'favProducts', component: FavProductsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },    //the default view is set to the Search component
  //{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FavProductsComponent,
    ProductDetailsComponent,
    ReviewComponent,
    SearchResultsComponent,
    HomeComponent,
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
  providers: [ProductService, UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }