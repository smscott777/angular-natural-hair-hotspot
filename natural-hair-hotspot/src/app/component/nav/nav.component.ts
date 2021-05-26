import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit{

    constructor(private _router: Router){}

    ngOnInit(){}

    /**
     * Searches by category id when the corresponding button is clicked.
     * @param id The category id.
     */
    searchByCategoryId(id: number){
        this._router.navigateByUrl('/search/category/'+id);
    }
}