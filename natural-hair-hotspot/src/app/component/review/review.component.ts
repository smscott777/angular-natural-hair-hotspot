import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

}