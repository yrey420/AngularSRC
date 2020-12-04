import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';

import { DataBaseService } from '../../../services/data-base.service';
import { FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import { AngularFireFunctionsModule} from '@angular/fire/functions';


@NgModule({
  declarations: [ContactoComponent],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,    MatInputModule,    MatButtonModule,    MatFormFieldModule,    MatIconModule,    MatListModule,    MatOptionModule,    MatSelectModule,

    AngularFireFunctionsModule,
  ],
  exports:[],
  providers:[DataBaseService],
})
export class ContactoModule { }
