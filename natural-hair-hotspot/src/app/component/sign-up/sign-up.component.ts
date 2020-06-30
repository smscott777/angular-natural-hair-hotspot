import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

}