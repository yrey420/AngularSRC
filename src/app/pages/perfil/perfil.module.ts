import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
//import {ModalComponent} from '../../componentes/modal/modal.component';

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
import { MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule,

    FormsModule,    MatButtonModule,
    MatInputModule,    MatDatepickerModule,
    MatNativeDateModule,    MatGridListModule,
    MatFormFieldModule,    MatChipsModule,
    MatIconModule,    MatToolbarModule,
    MatCheckboxModule,    MatOptionModule,
    MatSelectModule,    FlexLayoutModule,
    MatListModule,    MatAutocompleteModule,
    MatCardModule
  ],
  exports: [PerfilComponent],
})
export class PerfilModule { }
