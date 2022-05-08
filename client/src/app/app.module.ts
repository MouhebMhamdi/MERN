import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { ProductComponent } from './modules/product/product.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';
import { LoginComponent } from './modules/login/login.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
	url: "http://localhost:3000", // socket server url;
	options: {
		transports: ['websocket']
	}
}
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UsersComponent,
    LoginComponent,
    NotfoundComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    NgbModule,
    MatTableModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
