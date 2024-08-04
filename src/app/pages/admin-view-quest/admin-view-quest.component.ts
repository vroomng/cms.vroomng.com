import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-view-quest',
  standalone: true,
  imports: [],
  templateUrl: './admin-view-quest.component.html',
  styleUrl: './admin-view-quest.component.scss'
})
export class AdminViewQuestComponent {
  @Input() searchText: string = '';
  exportExcel() {
    throw new Error('Method not implemented.');
  }
  applyFilter() {
    throw new Error('Method not implemented.');
  }

}
