import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { Market } from 'src/app/core/Model/ImagesMarket';
import { ProductService } from 'src/app/core/Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product:Market[]
  p:number=1;
  term: string;
  constructor(private productService:ProductService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.productService.data().subscribe(res=>{
      this.product=res;
    })
  }

  toggle(event: MatSlideToggleChange,id:number) {
    
    let data={
      AdminAnswer:event.checked
    }
    this.productService.update(id,data).subscribe((res)=>{
        this.toastr.success("Picture changed successfully !");
    },()=>console.log(console.error("error"))
    )
  }
}
