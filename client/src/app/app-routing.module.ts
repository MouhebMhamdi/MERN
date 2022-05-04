import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ProductComponent } from './modules/product/product.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {  
   path:'dashboard',component:DefaultComponent,
   children:[{
     path:'',
     component:DashboardComponent
   },{
  path:'users',
  component:UsersComponent
   },
   {path:'product',component:ProductComponent}
  ]



},{
  path:"**",component:NotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
