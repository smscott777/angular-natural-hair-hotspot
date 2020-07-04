import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

    // Takes a keyword input specified in the html page then navigates to the path specified in the app.module
    searchProducts(keyword: string){
        console.log('keyword', keyword);
        this._router.navigateByUrl('/search/'+keyword);
    }

    // Searches by category id
    searchByCategoryId(id: number){
        console.log('id', id);
        this._router.navigateByUrl('/search/category/'+id);
    }

}