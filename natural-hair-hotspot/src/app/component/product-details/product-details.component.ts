import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

}