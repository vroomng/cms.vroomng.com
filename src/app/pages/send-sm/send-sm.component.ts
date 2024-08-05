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
  selector: 'app-send-sm',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent, VRInputComponent, LoaderComponent],
  templateUrl: './send-sm.component.html',
  styleUrl: './send-sm.component.scss'
})
export class SendSmComponent implements OnInit {
  private baseUrl = environment.serverUrl;

  private http = inject(HttpClient);
  isModalVisible: boolean = false;
  inSubmission = false; 
  suportUUID: any

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isModalVisible = true;
  }

  message =  new FormControl('',[Validators.required, Validators.minLength(1)]);
  media =  new FormControl('',[Validators.required, Validators.minLength(1)]);
 

  sendSMForm = new FormGroup({

    message: this.message,
    media: this.media

  })

  submit(){

    console.log(this.sendSMForm.value)
   
    this.inSubmission = true

    this.sendSupportMessage(this.sendSMForm.value, this.suportUUID).subscribe({
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

  sendSupportMessage(createBuildForm: any, suportUUID: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/support/send/message/${suportUUID}`, createBuildForm)
  }

  reset(){
    this.sendSMForm.reset()
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
