import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService} from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
  });
  public user: Observable<any>;
  public enviado = false;
  constructor(private authSvc:AuthService, private router: Router) { }

  async ngOnInit() {
    this.user = await this.authSvc.userData$;
    await this.authSvc.userData$.subscribe(res=>{
      if (res){
        this.router.navigate(['/home']);
      }
    });
    const url = this.router.url;
    this.authSvc.confirmSignIn(url);
  }
  onSignIn(){
    const {email} = this.loginForm.value;
    this.authSvc.login(email);
    this.enviado = true;
  }


}
