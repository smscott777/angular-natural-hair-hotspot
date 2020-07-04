import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit{

    constructor(private _router: Router){}

    ngOnInit(){}

    // Searches by category id
    searchByCategoryId(id: number){
        console.log('id', id);
        this._router.navigateByUrl('/search/category/'+id);
    }
}