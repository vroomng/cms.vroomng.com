import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IAdmin } from '../../model/admins';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/shared/modal/modal.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, ModalComponent, ButtonComponent, HttpClientModule, LoaderComponent],
})
export class AdminEditComponent implements OnInit {

  private baseUrl = environment.serverUrl;
  private http = inject(HttpClient);

  inSubmission = false; 
  driverDtls:boolean = false;
  banks: any;

  admins!: IAdmin [] | any;
  adminId!: any;
  userDetails:any
  displayDialog:boolean = false;

  showAlert:boolean = false;
  alertMsg = 'please wait your account is being created';
  alertColor = 'primary';

   accountInfo = {
    account_name: "",
    account_number: "",
    bank_name: "",
    bank_code: "",
    bank_location: "",
    IFSC: null,
    currency: "",
    type: ""
};

// Define a property for the selected file
driver_license_front: File | null = null;
driver_license_back:any
insurance_document_front:any
insurance_document_back:any
vehicle_inspection_report:any
other_documents:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    ){

  }
  ngOnInit() { 
      this.displayDialog = true
    this.adminId = this.route.snapshot.paramMap.get('uuid')
    console.log(this.adminId)
    this.getSingleUser(this.adminId).subscribe(
      (res:any)=>{
        console.log('single user',res)
        this.admins = res.data
        console.log(this.admins.user.email)

        if(this.admins.user.user_type === 'driver'){
          this.getBanks().subscribe(
            {
              next: (res: any) => {
                this.banks = res.data.banks
                console.log(this.banks)
              },
              error: (err: any) => {
                console.error('error', err);
                alert(err.error.data.message)
              }
            }
          )
        }
    }

  )

  }


  profile_url:any;

  updateUser() {

   this.showAlert = true;
   this.inSubmission = true;

    var editAdminForm = {
      first_name: this.admins.user.user_profile.first_name,
      last_name: this.admins.user.user_profile.last_name,
      // email: this.admins.email,
      phone_no: this.admins.user.phone_no,
      // password: this.admins.password,
      city: this.admins.user.user_profile.city,
      user_type: this.admins.user.user_type,
    }

    console.log(editAdminForm)

    this.updateAdmin(editAdminForm, this.adminId).subscribe({
      next: (res:any) => {
        console.log(res)
       if(res.success === 'true'){
        alert(res.data.message)
        this.inSubmission = false;
     
        setTimeout(() => {
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        }, 1000);

     } else {
      alert(res.data.message)
      this.inSubmission = false
     }
      },
      error: (err:any) => {
        console.log('error occured',err);
        this.inSubmission = false
      }
    })
   
  }

  getSingleUser(userId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/admin/user/${userId}`);
  }
  getBanks(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/banks/dropdown`);
  }
  updateAdmin(editAdminForm: object, adminId:any) {
    return this.http.put(`${this.baseUrl}/api/admin/user/update/${adminId}`, editAdminForm);
  }

  deleteUser() {
     
      const adminId = this.adminId;
      console.log(adminId)
      this.deleteAdmin(adminId).subscribe((res:any) => {
          console.log(res);

          if(res.success == true){
            alert(res.data.message)
            this.router.navigate(['/users']);
          } else {
            alert(res.data.message)
          }
        })
        

       
    
    }

    deleteAdmin(adminId:any) {
      return this.http.delete(`${this.baseUrl}/api/admin/user/delete/${adminId}`);
    }

     closeEdit(){
      // window.alert('close')
      this.displayDialog = !this.displayDialog;
      this.router.navigate(["/users"])
     }

     showModal() {
      this.displayDialog = !this.displayDialog;
    }
  
    hideModal() {
      this.displayDialog = !this.displayDialog;
    }

   

    onFileSelected(event: any) {
      const file: File = event.target.files[0];

  // Validate the file type (optional, but recommended)
  const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedFileTypes.includes(file.type)) {
    alert('Invalid file type. Please select a JPEG, PNG, or PDF file.');
    return;
  }

  this.driver_license_front = file;
  console.log('Driver Licence Front:', this.driver_license_front);
    }
  
    onFileSelected0(event: any) {
      const file: File = event.target.files[0];
      this.driver_license_back = file;
      console.log('driver licence back:', this.driver_license_back);
    }
    onFileSelected1(event: any) {
      const file: File = event.target.files[0];
      this.insurance_document_front = file;
      // console.log('insurance front:', this.insurance_document_front.name);
      // if(file){
      //   console.log('insurance front:', file.name);
      // }
    }
    onFileSelected2(event: any) {
      const file: File = event.target.files[0];
      this.insurance_document_back = file;
      console.log('insurance back:', this.insurance_document_back);
    }
    onFileSelected3(event: any) {
      const file: File = event.target.files[0];
      this.vehicle_inspection_report = file;
      console.log('report:', this.vehicle_inspection_report);
    }
    onFileSelected4(event: any) {
      const file: File = event.target.files[0];
      this.other_documents = file;
      console.log('documents:', this.other_documents);
    }
  

   
    uploadDocuments(){

      let documents = {
        driver_license_front: this.driver_license_front,
        driver_license_back: this.driver_license_back,
        insurance_document_front: this.insurance_document_front,
        insurance_document_back: this.insurance_document_back,
        vehicle_inspection_report: this.vehicle_inspection_report,
        other_documents: this.other_documents
      };

      console.log(documents)
      if (this.driver_license_front || this.driver_license_back || this.insurance_document_front || this.insurance_document_back || this.vehicle_inspection_report || this.other_documents) {
        // Example of creating FormData to send the file to a server
        // const formData = new FormData();
        // formData.append('file', this.selectedFile);
        alert('upoading....')

        if (this.driver_license_front) {
          const formData = new FormData();
          formData.append('upload', this.driver_license_front);
      
          this.uploadToStorage(this.adminId, formData).subscribe({
            next: (res: any) => {
              console.log(res);
              alert('Uploaded successfully');
            },
            error: (err: any) => {
              console.error('Error', err);
              alert(err.error.data.message || 'An error occurred during upload.');
            }
          });
        } else {
          alert('Please select a file before uploading.');
        

          console.log(FormData)

        }





  
      } else {
        alert('Please select a file to upload');
      }
    }

    uploadToStorage(adminId: any, upload:any) {
      return this.http.post(`${this.baseUrl}/api/upload/third_party/${adminId}`, upload );
    }

    onRemoveImage() {
      this.profile_url = null;
    }

    details(){
     this.driverDtls = !this.driverDtls
    }

    selectedBank: any;

  onBankSelect(event: any) {
    const selectedBankId = +event.target.value;
    this.selectedBank = this.banks.find((bank: { id: number; }) => bank.id === selectedBankId);
    console.log(this.selectedBank);
  }

  AddBank() {
    this.inSubmission = !this.inSubmission
     console.log('intial info',this.accountInfo)
     console.log('selected bank info',this.selectedBank)

     let addBankDetails = {
      account_name: this.accountInfo.account_name,
      account_number: this.accountInfo.account_number,
      bank_name: this.selectedBank.name,
      bank_code: this.selectedBank.code,
      bank_location: this.selectedBank.country,
      IFSC: this.selectedBank.longcode,
      currency: this.selectedBank.currency,
      type: this.selectedBank.type
     }
      
     console.log('merged',addBankDetails)
     console.log('driverid',this.adminId)
     this.addBankaccount( this.adminId, addBankDetails).subscribe({
      next: (res:any) => {
        console.log(res)
        alert(res.data.message)
        this.inSubmission = false
      },
      error: (err:any) => {
        console.log('error occured',err);
        alert(err.error.data.message)
        this.inSubmission = false
      }
     })
  }

  addBankaccount(userId:any, addBankDetails:any){
   return this.http.put(`${this.baseUrl}/api/admin/user/update/add_driver_bank/${userId}`, addBankDetails)
  }



}
