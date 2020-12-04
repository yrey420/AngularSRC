import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatCard} from '@angular/material/card';
import { AuthService } from 'src/app/services/auth/auth.service';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-mat',
  templateUrl: './sidenav-mat.component.html',
  styleUrls: ['./sidenav-mat.component.scss']
})
      export class SidenavMatComponent implements OnInit {
        public user$: Observable<any> = this.authSvc.afAuth.user;
        public user : any;

        @ViewChild('sidenav') sidenav: MatSidenav;


        events: string[]=[];
        opened: boolean;




        constructor(private authSvc: AuthService) { }

        ngOnInit(): void {

        }
        salir(){
          this.authSvc.logout();
        }
        close(){
          this.sidenav.close();
        }

      }
