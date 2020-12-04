import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecordsComponent } from './pages/records/records.component';
import { VideoComponent } from './pages/video/video.component';
import { CheckLoginGuard} from 'src/app/services/guard/check-login.guard';
import {EquipoComponent} from 'src/app/pages/equipo/equipo.component';

const routes: Routes = [


  {path: 'records', component:RecordsComponent, canActivate:[ CheckLoginGuard ]},

  { path: 'video', component:VideoComponent },

  { path: 'equipo', component:EquipoComponent },

  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },

  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'login', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },


  { path: 'miperfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule), canActivate:[CheckLoginGuard] },


  { path: 'contactanos', loadChildren: () => import('./pages/contacto/contacto/contacto.module').then(m => m.ContactoModule) },






  {path: '**', redirectTo:'/home', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
