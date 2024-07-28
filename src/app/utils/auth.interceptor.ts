import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Initialize token
    let token: string | null = null;

    // Get the auth token from the local storage
    const storedUserDetails = localStorage.getItem('userDetails');

    if (storedUserDetails) {
      token = JSON.parse(storedUserDetails).token;
      console.log('Token found:', token);
    } else {
      console.log('No token found');
    }

    // Clone the request and add the Authorization header if token is available
    let clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'x-api-public-key': 'VR_PUBLIC_bNsZoSNC0NVHm6',
        'x-api-secret-key': 'VR_SECRET_jnHK7vPMIS962d'
      }
    });

    if (token) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the cloned request to the next handler
    return next.handle(clonedRequest);
  }
}
