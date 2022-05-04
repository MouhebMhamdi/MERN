import { EventEmitter,Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggeleSideBarForMe:EventEmitter<any> =new EventEmitter();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  toggleSideBar(){
    this.toggeleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 50);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
