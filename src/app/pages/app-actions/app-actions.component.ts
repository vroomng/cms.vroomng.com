import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppBuildComponent } from '../app-build/app-build.component';
import { MessageSupportComponent } from '../message-support/message-support.component';
import { AppSurgeComponent } from '../app-surge/app-surge.component';
import { MessageNotificationsComponent } from '../message-notifications/message-notifications.component';


@Component({
  selector: 'app-app-actions',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, AppBuildComponent, MessageSupportComponent, AppSurgeComponent, MessageNotificationsComponent],
  templateUrl: './app-actions.component.html',
  styleUrl: './app-actions.component.scss'
})
export class AppActionsComponent {

@ViewChild(AppBuildComponent) childRef!: AppBuildComponent;
@ViewChild(MessageSupportComponent) childRef2!: MessageSupportComponent;
@ViewChild(MessageNotificationsComponent) childRef1!: MessageNotificationsComponent;
@ViewChild(AppSurgeComponent) childRef3!: AppSurgeComponent;

@ViewChild(AppBuildComponent) exportRef!: AppBuildComponent;
@ViewChild(MessageSupportComponent) exportRef2!: MessageSupportComponent;
@ViewChild(MessageNotificationsComponent) exportRef1!: MessageNotificationsComponent;
@ViewChild(AppSurgeComponent) exportRef3!: AppSurgeComponent;

searchText: string = ''

  pages = [
    { id: 0, name: "App build", },
    { id: 1, name: "Notifications", },
    { id: 2, name: "Support", },
    { id: 3, name: "Surge", },
 ]

 activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;
  }

  getRouterLink(index: number): string {
    switch(index) {
      case 0:
        return '/create-build';
      case 1:
        return '/send-notification';
      case 2:
        return '/send-sm';
      // case 3:
      //   return '/add-partners';
      default:
        return '/';
    }
  }

  applySearch(index: number) {
    if (index === 0) {
        this.childRef.applyFilter()
    } else if (index === 1) {
      this.childRef1.applyFilter() 
    }
     else if (index === 2) {
      this.childRef2.applyFilter()
    }
     else if (index === 3) {
      this.childRef3.applyFilter()
    }
}

  export(index: number){
    if (index === 0) {
      this.exportRef.exportExcel()
  } else if (index === 1) {
    this.exportRef1.exportExcel()
  }
   else if (index === 2) {
    this.exportRef2.exportExcel()
  }
   else if (index === 3) {
    this.exportRef3.exportExcel()
  }
  }


  }


