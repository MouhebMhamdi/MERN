import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/core/Model/Admin';
import { AuthenticationServiceService } from 'src/app/core/Services/authentication-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  admin:Admin[];
  constructor(private authService:AuthenticationServiceService) { }

  ngOnInit(): void {
    this.authService.connect().subscribe(res=>{
     this.admin=res;
     console.log(res[0])
   },()=>console.log("error"))
  }

}
