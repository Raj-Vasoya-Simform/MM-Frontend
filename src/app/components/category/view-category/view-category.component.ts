import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedServices } from 'src/app/services/shared.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categoryFormGroup!: FormGroup;
  @Output() viewCategroy = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,  // Inject FormBuilder
    private sharedServices: SharedServices,  // Inject SharedServices
    public dialogRef: MatDialogRef<ViewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Initialize form group with disabled controls
    this.categoryFormGroup = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }]
    });

    if (this.data && this.data._id) {
      this.fetchCategoryData(this.data._id);
    }
  }

  fetchCategoryData(category_id: string): void {
    this.sharedServices.getCategory(category_id).pipe(
      catchError(error => {
        // Handle error
        console.error('Error fetching category data:', error);
        return of({});  // Return an empty object or handle the error as needed
      })
    ).subscribe(category => {
      this.setFormValues(category);
    });
  }

  setFormValues(data: any): void {
    console.log("data : ",data)
    this.categoryFormGroup.patchValue({
      name: data.data.name || '',
      status: data.data.status || ''
    });
  }
}
