import { Component, OnInit, Injectable } from '@angular/core';
import {DataBaseService} from 'src/app/services/data-base.service';
import {Usuario} from 'src/app/models/usuario.model';
import { firestore } from 'firebase';



@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})

@Injectable()
      export class RecordsComponent implements OnInit {

        usuarios: Usuario[] =[];

        constructor(public dataAPi: DataBaseService){}


        async ngOnInit() {
          (await this.dataAPi.obtenerUsuarios()).subscribe(
            user=>{
            console.log('user' , this.usuarios=user);
          });

        }

}
