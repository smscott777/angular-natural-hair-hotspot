import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
    selector: 'app-my-items',
    templateUrl: './my-items.component.html'
})
export class MyItemsComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

}