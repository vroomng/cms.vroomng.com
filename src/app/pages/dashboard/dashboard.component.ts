import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDashboard } from '../../model/dashboardInfo';
import { ChartModule } from 'primeng/chart';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChartModule, LoaderComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userDetails:any
  data:any;
  dashboard:any;
  chart_data:any
  options: any;

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const storedUserDetails = localStorage.getItem('userDetails');
      console.log(storedUserDetails);

      if (storedUserDetails) {
        this.userDetails = JSON.parse(storedUserDetails);

      } else {
        console.log('User details not found in localStorage.');
      }
      this.getDashboardData().subscribe(
        data => {
          // this.dashboardData = data.dashboard; // Assuming data contains a 'dashboard' property
          
          this.dashboard = data.data.dashboard;
          this.chart_data = data.data.registered_users
          console.log(data)
          console.log('Dashboard Data:', this.dashboard);
          console.log('Registered Users Data:', this.chart_data);
        },
        error => {
          console.error('Error fetching dashboard data:', error);
        }
      );
        // console.log(dashboard);

        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','october', 'November','December'],
          datasets: [
              {
                  label: 'Registered Users for this year',
                  backgroundColor: documentStyle.getPropertyValue('--brand900'),
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [6, 3, 5, 24, 259, 8, 5,0,0,2,5,0]
              },
            
          ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };


        
    
  }

  

    getDashboardData(): Observable<any>{
      return this.http.get<IDashboard[]>(`${this.baseUrl}/api/admin/dashboard`);
    }

    

    
   

}
 