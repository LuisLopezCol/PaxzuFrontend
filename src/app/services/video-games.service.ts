import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from 'src/app/models/maintenance';


@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {

  constructor(private http:HttpClient){}

  //-------------------Database products methods-------------------

  urlCharacter  = "https://swapi.dev/api/people/"
  urlSWAPIPeople  = "https://swapi.dev/api/people/?_limit=50&page="
  urlSWAPIPlanets  = "https://swapi.dev/api/planets/?_limit=50&page="

  getPeople(page: any): Observable<any>{
    return this.http.get(`${this.urlSWAPIPeople}${page}`);
  }
  getPlanets(page: any): Observable<any>{
    return this.http.get(`${this.urlSWAPIPlanets}${page}`);
  }

  getCharacter(id: any): Observable<any>{
    return this.http.get(`${this.urlSWAPIPeople}${id}`);
  }
  //-------------------Database maintenance methods-------------------

  // urlCRUD  = "https://crudbackendllopez.herokuapp.com/maintenance/"
  urlCRUD  = "https://paxzubackend.herokuapp.com/crud";

  postMaintenance(maintenance: Maintenance): Observable<any>{
		return this.http.post(this.urlCRUD, maintenance);
	}
  getMaintenances(): Observable<any>{
    return this.http.get(this.urlCRUD);
  }

  getMaintenance(id: any): Observable<any>{
    return this.http.get(`${this.urlCRUD}/${id}`);
  }
  
  putMaintenance(id: string, maintenance: Maintenance):Observable<any>{
		return this.http.put(`${this.urlCRUD}/${id}`, maintenance);
	}

	deleteMaintenance(id: String): Observable<any>{
		return this.http.delete(`${this.urlCRUD}/${id}`);
	}
}
