import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/core/Model/Admin';
import { AuthenticationServiceService } from 'src/app/core/Services/authentication-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myFormLogin: FormGroup;
  Admin:Admin
  submittedLogin:boolean= false;
  tab:any=[]
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private router:Router,private authService:AuthenticationServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem("AccessToken")!=null){
      this.router.navigate(["/dashboard"]);
    }
    this.Admin=new Admin();
    this.myFormLogin=  this.formBuilder.group(
      {
        email: ['',[
          Validators.required,
          Validators.email]
        ],
        password: ['',[
          Validators.required
        ]]

      });
  }

  login(){
    this.submittedLogin = true;
    if (this.myFormLogin.invalid) {
      return;
    }
    let data={
      email:this.Admin.email,
      Password:this.Admin.password
    }
    this.authService.login(data).subscribe((res)=>{
      this.tab=res;
      localStorage.setItem("AccessToken",this.tab.AccessToken);
      localStorage.setItem("Connect",this.tab.Admin);
       this.router.navigate(["/dashboard"]);
    },()=>this.toastr.error('Error !','Invalid account please try again'))
  }
}
