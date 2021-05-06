import {Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
    selector: 'app-fav-products',
    templateUrl: './fav-products.component.html'
})
export class FavProductsComponent implements OnInit{

    favoriteProducts: Product[] = [];

    constructor(private _productService: ProductService,
                private _userService: UserService) {}

    // Populates a list of favorite products as soon as the page is loaded.            
    ngOnInit() {
        this.getFavoriteProducts();
        console.log("Logged in status: ", this.isLoggedIn());
    }

    // Gets the logged in user's username and returns a list of their favorite products.
    getFavoriteProducts() {
        const username: string = this._userService.getUsername();

        this._productService.getFavoriteProducts(username)
                            .subscribe(data => {
                                this.favoriteProducts = data._embedded.products;
                                console.log('data: ', data);
                            });
    }

    // Returns true if a user is logged in. Otherwise returns false.
    isLoggedIn() {
        return this._userService.getLoggedInStatus();
    }
}