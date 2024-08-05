import { Component, inject, OnInit } from '@angular/core';
import { IMapList } from '../../model/maps';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { CommonModule } from '@angular/common';


declare const google: any;

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [ HttpClientModule, CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.getMapCardDetails().subscribe({
      next: (res: any) => {
        this.maplist = res.data
        console.log(this.maplist)
      },
      error: (err: any) => {
        console.error('error', err);
        alert(err.error.data.message)
      }
    })
  }

  getMapCardDetails(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/explore/cards`);
  }
  maplist!: IMapList | any;

}
