import { Injectable, OnInit } from '@angular/core';
import { ProductService } from '../core/Services/product.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit{
  gt15:number=0;
  constructor(private productService:ProductService) { }
  ngOnInit(): void {
    this.Age15(50);
  }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'Age greater then 15',
      y:Number(localStorage.getItem("gt15")),
      sliced: true,
      selected: true
    },{
      name: 'Age greater then 20',
      y:Number(localStorage.getItem("gt20")),
      sliced: true,
      selected: true
    }
    ,{
      name: 'Age greater then 30',
      y:Number(localStorage.getItem("gt30")),
      sliced: true,
      selected: true
    },{
      name: 'Age greater then 50',
      y:Number(localStorage.getItem("gt50")),
      sliced: true,
      selected: true
    },{
      name: 'Age greater then 80',
      y:Number(localStorage.getItem("gt50")),
      sliced: true,
      selected: true
    }];
  }

  Age15(age:number){
    this.productService.age(age).subscribe(res=>{
      this.gt15=res;
    })
  }
}