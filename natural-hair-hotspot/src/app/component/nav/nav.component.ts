import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit{

    constructor(private _router: Router,
                private _userService: UserService){}

    ngOnInit(){}

    /**
     * Searches by category id when the corresponding button is clicked.
     * @param id The category id.
     */
    searchByCategoryId(id: number){
        this._router.navigateByUrl('/search/category/'+id);
    }
}