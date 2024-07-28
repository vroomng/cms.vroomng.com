import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule , LoaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  loader = true

 constructor(private router: Router) { }

 ngOnInit(): void {
  //  alert('Auth Page')
   this.router.navigate(['login'])
 }
}
