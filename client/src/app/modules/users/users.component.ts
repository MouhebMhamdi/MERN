import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/core/Model/Admin';
import { AuthenticationServiceService } from 'src/app/core/Services/authentication-service.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Admin:Admin[]
  Admins:Admin
  p:number=1;
  term: string;
  myFormLogin: FormGroup;
  submittedLogin:boolean= false;

  id:number
  constructor(private toastr:ToastrService,private formBuilder: FormBuilder,private router:Router,private authService:AuthenticationServiceService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllDatta()

    this.Admins=new Admin();
    this.myFormLogin=  this.formBuilder.group(
      {
        email: ['',[
          Validators.required,
          Validators.email]
        ],
        username: ['',[
          Validators.required
        ]],
        profilepic: ['',[
          Validators.required
        ]]

      });
  }
  getAllDatta(){
    this.authService.data().subscribe(admin=>{
      
      this.Admin=admin;
    })
  }
  activateAccount(id:Number,etat:boolean){

    let data={
      Status:etat
    }
    
  }
toggle(event: MatSlideToggleChange,id:number) {
  console.log(event.checked+" "+id);
  let data={
    Status:event.checked
  }
  this.authService.update(id,data).subscribe((res)=>{
      this.toastr.success("Status changed successfully !");
  },()=>console.log(console.error("error"))
  )
}
updateUser(){
  this.authService.update(this.id,this.Admins).subscribe((res)=>{
    this.toastr.success("User changed successfully !");
},()=>console.log(console.error("error"))
)
}
getUserById(id:number,content:any){
  this.authService.getById(id).subscribe((admin)=>{
    this.Admins=admin;
  })
  this.id=id;
  this.open(content);
}
  deleteEvent(id:Number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        
        this.authService.delete(id).subscribe();
        this.getAllDatta()
      }
      
    })
    
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res:any) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.getAllDatta();
      this.Admins=new Admin();
    });
  }
}
