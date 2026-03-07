import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actor, ActorService } from './actor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-actor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        RouterLink
    ],
    template: `
    <h2>Actor</h2>
      <mat-card>
        <mat-card-header>
            <mat-card-title>Search</mat-card-title>
        </mat-card-header>
        <mat-card-content>
            <div class="row">
                <div class="col">
                        <mat-form-field appearance="fill"  style="width: 100%;">  
                            <mat-label>Keyword</mat-label>
                            <input matInput [(ngModel)]="keyword" placeholder="Keyword" />
                        </mat-form-field>   
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="example-button-row">
                        <button matButton="elevated" (click)="onSubmit()">Search</button> &nbsp;
                        <button matButton="elevated" routerLink="/actor-detail">Add New Data</button>
                    </div>
                </div>
            </div>
        </mat-card-content>
      </mat-card>
      <br/>
      <br/>
      <mat-card>
        <mat-card-header>
            <mat-card-title>Results</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" *ngIf="dataSource.data.length">
            <ng-container matColumnDef="actor_id">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let element"> {{element.actor_id}} </td>
            </ng-container>
            <ng-container matColumnDef="first_name">
              <th mat-header-cell *matHeaderCellDef> First Name </th>
              <td mat-cell *matCellDef="let element"> {{element.first_name}} </td>
            </ng-container>
            <ng-container matColumnDef="last_name">
              <th mat-header-cell *matHeaderCellDef> Last Name </th>
              <td mat-cell *matCellDef="let element"> {{element.last_name}} </td>
            </ng-container>
            <ng-container matColumnDef="last_update">
              <th mat-header-cell *matHeaderCellDef> Last Update </th>
              <td mat-cell *matCellDef="let element"> {{element.last_update}} </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let element">
                <button mat-button color="warn" (click)="deleteActor(element.actor_id)">Delete</button>
                <button mat-button color="primary" [routerLink]="['/actor-detail', element.actor_id]">Edit</button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
          <mat-paginator [pageSize]="10" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
        </mat-card-content>
      </mat-card>
  `,
})
export class ActorComponent implements OnInit, AfterViewInit {

    keyword: string = '';
    actors: Actor[] = [];
    displayedColumns: string[] = ['actor_id', 'first_name', 'last_name', 'last_update', 'actions'];
    dataSource = new MatTableDataSource<Actor>(this.actors);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private actorService: ActorService, private _snackBar: MatSnackBar) {

    }

    ngOnInit(): void {
        

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    onSubmit() {
        this.actorService.getByKeyword(this.keyword).subscribe(data => {
            this.actors = data;
            this.dataSource.data = data;
            if (this.dataSource.paginator) {
                this.dataSource.paginator?.firstPage();
            }
        });
    }

    deleteActor(id: number) {
        if (confirm('Are you sure you want to delete this actor?')) {
            this.actorService.delete(id).subscribe({
                next: () => {
                    this.dataSource.data = this.dataSource.data.filter(actor => actor.actor_id !== id);
                    this._snackBar.open('Actor deleted', 'Close', { duration: 2000 });
                }, error: (err) => {
                    this._snackBar.open('Error deleting actor: actor may be referenced by other data', 'Close', { duration: 2000 });
                }
            });
        }
    }
}
