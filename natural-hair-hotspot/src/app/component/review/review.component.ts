import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit{

    product: Product = new Product();

    constructor(private _activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private _router: Router) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(
            () => {
                this.getProductInfo();
            }
        )
    }

    getProductInfo(){
        const prodNum: number = +this._activatedRoute.snapshot.paramMap.get('prodNum');

        this._productService.get(prodNum).subscribe(
            data => {
                this.product = data;
            }
        );
    }

    searchProducts(keyword: string){
        console.log('keyword', keyword);
        this._router.navigateByUrl('/search/'+keyword);
    }
}