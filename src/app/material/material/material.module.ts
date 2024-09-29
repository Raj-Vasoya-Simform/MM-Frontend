import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion'
// import { MatSortModule } from '@angular/material/sort'
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatDatepickerModule,
  ReactiveFormsModule,
  FormsModule,
  MatTooltipModule,
  MatSelectModule,
  MatBottomSheetModule,
  MatRadioModule,
  MatSnackBarModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRippleModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTabsModule,
  MatPaginatorModule,
  MatExpansionModule,
  // MatSortModule,
  MatGridListModule,
  MatCheckboxModule,
]
@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
