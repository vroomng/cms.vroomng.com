import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  inSubmission: boolean = false;
  hidePassword: boolean = true;

  private baseUrl = environment.serverUrl; // Set your API base URL here

  credentials = {
    email_or_phone: '',
    password: '',
    device_token: this.generateRandomToken(4)
  };

  private http = inject(HttpClient);
  constructor(private router: Router) { }

  generateRandomToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  login() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-public-key': 'VR_PUBLIC_bNsZoSNC0NVHm6',
      'x-api-secret-key': 'VR_SECRET_jnHK7vPMIS962d'
    });

    this.http.post(`${this.baseUrl}/api/login`, this.credentials, { headers })
      .subscribe({
        next: (response:any) => {
          console.log('Login successful', response);
          const {token} = response.data;
          localStorage.setItem('token', token)
     
          this.setLoginResponse(response.data);
          this.router.navigate(['/dashboard']);
          alert('Login Successful')
        },
        error: (error) => {
          console.error('Login failed', error);
          const message = error.error.data.message;
          alert(message);
        }
      });
  }

  // response storage
  private loginResponseSubject = new BehaviorSubject<any>(null);
  loginResponse$ = this.loginResponseSubject.asObservable();


  setLoginResponse(response: any) {
    this.loginResponseSubject.next(response);
    console.log(response);
    const res = JSON.stringify(response)
    localStorage.setItem('userDetails',(res));
    return response
  }

  hidePasswordToggle() {
    this.hidePassword = !this.hidePassword;
  }
  isDisabled = true;
}