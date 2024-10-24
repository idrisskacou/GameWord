import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launches } from '../models/launches';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService implements OnInit, OnChanges{

  ngOnInit(): void {
    this.getLaunchById;
    this.getLaunches
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getLaunchById;
    this.getLaunches;
  }
  getLaunchById(id: number): Observable<Launches> {
    // return this.http.get<Launches>(`${this.apiURL}/${id}`); // Ensure this returns an Observable
    // return this.http.get<Launches>(`${this.apiURL}/launches/${id}`);
    const url = `${this.apiURL}/launches/${id}`;
    console.log('Requesting launch details from:', url);
    return this.http.get<Launches>(url);
  }

  private apiURL = environment.apiURL
  //  private apiURL = environment.apiURL + "/launches"

  constructor(private http: HttpClient) { }
  
  getLaunches(): Observable<Launches[]> {
    return this.http.get<Launches[]>(this.apiURL);
  }
}
