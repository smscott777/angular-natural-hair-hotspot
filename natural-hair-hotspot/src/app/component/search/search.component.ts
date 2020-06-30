import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

    searchProducts(keyword: string){
        console.log('keyword', keyword);
        this._router.navigateByUrl('/search/'+keyword);
    }

}