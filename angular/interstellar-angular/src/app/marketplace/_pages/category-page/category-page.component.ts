import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

    
    constructor(private location: Location) { 
        console.log("cat pag  comp")
    }

    ngOnInit() {
    }

    allCategories() {
        this.location.back(); 
    }
  

}
