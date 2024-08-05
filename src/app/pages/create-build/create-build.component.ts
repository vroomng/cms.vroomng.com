import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule,  } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VRInputComponent } from '../../components/shared/vr-input/vr-input.component';

@Component({
  selector: 'app-create-build',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent],
  templateUrl: './create-build.component.html',
  styleUrl: './create-build.component.scss'
})

export class CreateBuildComponent implements OnInit {

  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  isModalVisible: boolean = false;
  inSubmission = false; 

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isModalVisible = true;
  }

  slug =  new FormControl('',[Validators.required, Validators.minLength(1)]);
  version =  new FormControl('',[Validators.required, Validators.minLength(1)]);
  user_type =  new FormControl('',[Validators.required, Validators.minLength(1)]);
  device_type =  new FormControl('',[Validators.required, Validators.minLength(1)]);

  createBuildForm = new FormGroup({

      slug: this.slug,
      version: this.version,
      user_type: this.user_type,
      device_type: this.device_type

  })

  submit(){

    console.log(this.createBuildForm.value)
   
    this.inSubmission = true

    this.createBuild(this.createBuildForm.value ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.inSubmission = false
        alert(res.data.message);
        this.router.navigate(["/app-actions-menu"])
      },
      error: (err: any) => {
        console.error('error',err);
        alert(err.error.data.message);
        this.inSubmission = false
      }
    })
    
  }

  createBuild(createBuildForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/build/create`, createBuildForm)
  }

  reset(){
    this.createBuildForm.reset()
  }
  close(){

    this.router.navigate(["/app-actions-menu"])
   }
  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

}



