import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';

import { AuthService} from '../../services/auth/auth.service';

import { FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ], 
  exports:[
    InicioComponent,
  ],
  providers:[ AuthService]
})
export class InicioModule { }
