import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteProductPayload } from 'src/app/common/favorite-product.payload';
import { UserService } from 'src/app/service/user.service';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
    selector: 'app-fav-products',
    templateUrl: './fav-products.component.html'
})
export class FavProductsComponent implements OnInit{

    favoriteProducts: Product[] = [];  
    favoriteProductPayload: FavoriteProductPayload = new FavoriteProductPayload();  
    prodNum: number;

    constructor(private _productService: ProductService,
                private _userService: UserService,
                private _router: Router) {}

    // Populates a list of favorite products on page load.            
    ngOnInit() {
        this.getFavoriteProducts();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false; // Refreshes the component when it is routed to in succession.
    }

    // Gets the logged in user's username then returns a list of their favorite products.
    getFavoriteProducts() {
        const username: string = this._userService.getUsername();

        this._productService.getFavoriteProducts(username)
                            .subscribe(data => {
                                this.favoriteProducts = data._embedded.products;
                            });
    }

    /**
     * Deletes a product from the logged in user's favorites list then refreshes the 
     * component so that the updated list appears.
     * @param prodNum The product number.
     */
    deleteFavoriteProduct(prodNum) {
        this.favoriteProductPayload.productProdNum = prodNum;
        this.favoriteProductPayload.username = this._userService.getUsername();

        this._userService.deleteFavProduct(this.favoriteProductPayload)
                            .subscribe();

        this.getFavoriteProducts();   // Required to refresh component on delete.
        
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/favProducts']);
            this.ngOnInit();    // Required to refresh component on delete.
        });   
    }

    // Returns true if a user is logged in. Otherwise returns false.
    isLoggedIn() {
        return this._userService.getLoggedInStatus();
    }
}