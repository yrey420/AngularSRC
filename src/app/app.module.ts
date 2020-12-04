import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{RecordsComponent}from'src/app/pages/records/records.component';
import{VideoComponent}from'src/app/pages/video/video.component';
import { SidenavMatComponent} from '../app/componentes/sidenav-mat/sidenav-mat.component';
import {FooterComponent} from '../app/componentes/footer/footer.component'

import {YouTubePlayerModule, YouTubePlayer} from '@angular/youtube-player';


//angular firebase
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';



//Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from'@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
//forms y material
import { FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import  { MatProgressBarModule} from '@angular/material/progress-bar';


import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';

//importaciones para el api rest
import { HttpClientModule} from '@angular/common/http';
import { CheckLoginGuard } from './services/guard/check-login.guard';


import { ModalComponent } from './componentes/modal/modal.component';

import { PerfilModule} from '../app/pages/perfil/perfil.module';




@NgModule({
  declarations: [

    AppComponent, RecordsComponent, VideoComponent, SidenavMatComponent, ModalComponent, FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage

    MatButtonModule,MatIconModule,MatSidenavModule,MatToolbarModule,
    MatTabsModule,MatTableModule,YouTubePlayerModule, MatCardModule,
    MatDialogModule,
        //Api jttp client module
        HttpClientModule,
        PerfilModule,

        ReactiveFormsModule,
        FormsModule,
        MatInputModule,    MatDatepickerModule,
        MatNativeDateModule,    MatGridListModule,
        MatFormFieldModule,    MatChipsModule,
        MatCheckboxModule,    MatOptionModule,
        MatSelectModule,    FlexLayoutModule,
        MatListModule,    MatAutocompleteModule,
        MatProgressBarModule



  ],
  exports:[MatCardModule, MatDialogModule, ModalComponent],
  providers: [YouTubePlayer, CheckLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
