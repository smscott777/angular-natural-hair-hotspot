import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

    constructor(private _router: Router) {}

    ngOnInit() {}

    /**
     * Stores the keyword input by the user in the search bar, then navigates to
     * the search URL with that keyword as an endpoint.
     * @param keyword The name or ingredient entered into the search bar by the user.
     */
    searchProducts(keyword: string) {
        this._router.navigateByUrl('/search/'+keyword);
    }
}