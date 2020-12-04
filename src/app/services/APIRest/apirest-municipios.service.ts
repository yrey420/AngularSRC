import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Municipio } from '../../interfaces/datos/municipio';

@Injectable({
  providedIn: 'root'
})
export class APIRestMunicipiosService {

  constructor(private http: HttpClient) { 
  }

  getAll(){
    return this.http.get<Municipio[]>(`${environment.urlColombia}`);
  }
}
