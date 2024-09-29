import { SharedServices } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any[] = [];
  filteredHistory: any[] = [];
  selectedModule: string = '';
  displayCount: number = 10;
  modules: string[] = ['All History', 'Category', 'Sales Order', 'Product'];  // Add actual module names

  constructor(private historyService: SharedServices) {}

  ngOnInit() {
    this.fetchHistory();
  }
  
  fetchHistory() {
    this.historyService.getAllHistory()
      .subscribe((response: any) => {
        this.history = response.data;
        this.filteredHistory = this.history; // Initialize with full history
      });
  }

  filterHistory() {
    if (this.selectedModule && this.selectedModule != 'All History') {
      this.filteredHistory = this.history.filter(entry => entry.module === this.selectedModule);
    } else {
      this.filteredHistory = this.history;  // Show all if no filter
    }
    this.displayCount = 10; 
  }

  getIcon(action: string): string {
    switch(action) {
      case 'added': return 'add_circle';
      case 'updated': return 'edit';
      case 'deleted': return 'delete';
      default: return '';
    }
  }

  viewMore() {
    this.displayCount += 10;  // Show 5 more entries when clicked
  }

  getIconClass(action: string): string {
    return `icon ${action}`;  // Dynamically assign the class based on action
  }
}
