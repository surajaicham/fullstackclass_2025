import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService, Actor } from './actor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>{{ isEdit ? 'Edit' : 'Add' }} Actor</h2>
    <form [formGroup]="actorForm" (ngSubmit)="onSave()">
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>First Name</mat-label>
        <input matInput formControlName="first_name" required />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Last Name</mat-label>
        <input matInput formControlName="last_name" required />
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Save</button>
      <button mat-button color="accent" (click)="onCancel()">Cancel</button>
    </form>
  `
})
export class ActorDetailComponent implements OnInit {
  actorForm: FormGroup;
  isEdit = false;
  actorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private actorService: ActorService,
    private _snackBar: MatSnackBar
  ) {
    this.actorForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.actorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.actorId) {
      this.isEdit = true;
      this.actorService.getById(this.actorId).subscribe(actor => {
        this.actorForm.patchValue(actor);
      });
    }
  }

  onSave() {
    if (this.actorForm.invalid) return;
    const actorData = this.actorForm.value;
    if (this.isEdit && this.actorId) {
      this.actorService.update({ ...actorData, actor_id: this.actorId }).subscribe(() => {
        this._snackBar.open('Actor updated', 'Close', { duration: 2000 });
        this.router.navigate(['/actor']);
      });
    } else {
      this.actorService.create(actorData).subscribe(() => {
        this._snackBar.open('Actor created', 'Close', { duration: 2000 });
        this.router.navigate(['/actor']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/actor']);
  }
}
