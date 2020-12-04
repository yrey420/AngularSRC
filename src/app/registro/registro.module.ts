import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//rutas y el componente
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';

//forms y material
import { FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';

//importamos el svs de la bd
import { DataBaseService } from '../services/data-base.service';

//importamos el autocomplete de angular








@NgModule({
  declarations: [RegistroComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroRoutingModule,
    //form y material modules
    FormsModule,    MatButtonModule,
    MatInputModule,    MatDatepickerModule,
    MatNativeDateModule,    MatGridListModule,
    MatFormFieldModule,    MatChipsModule,
    MatIconModule,    MatToolbarModule,
    MatCheckboxModule,    MatOptionModule,
    MatSelectModule,    FlexLayoutModule,
    MatListModule,    MatAutocompleteModule,
    //fin material modules
    

  ],
  exports: [
    RegistroComponent,
  ],
  providers: [
    DataBaseService,
  ]
})
export class RegistroModule { }
