import { Component, OnInit } from '@angular/core';
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
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// Import Angular Material modules as needed in your app config or bootstrap

@Component({
    selector: 'app-login-demo',
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
        ReactiveFormsModule
    ],
    template: `
    <h2>Login Demo</h2>
      <mat-card>
        <mat-card-header>
            @if(isLoggedIn) {
                <mat-card-title>Welcome!!</mat-card-title>
            } @else {
                <mat-card-title>Please Login</mat-card-title>
            }
        </mat-card-header>
        <mat-card-content>
            @if(isLoggedIn) {
                <p>{{currentUser}}</p>
                <br/>
                <div class="example-button-row">
                    <button matButton="elevated" (click)="onLogout()">Logout</button>
                </div>
            } @else {
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                    <mat-form-field appearance="fill">
                        <mat-label>Username</mat-label>
                        <input matInput formControlName="username" placeholder="Enter your username" />
                        @if(loginForm.controls['username'].invalid && loginForm.controls['username'].touched) {
                            Username is required
                        }
                    </mat-form-field>
                    <br />
                    <br/>
                    <mat-form-field appearance="fill">
                        <mat-label>Password</mat-label>
                        <input matInput type="password" formControlName="password" placeholder="Enter your password" />
                        @if(loginForm.controls['password'].invalid && loginForm.controls['password'].touched) {
                            Password is required
                        }
                    </mat-form-field>
                    <br/>
                    <div class="example-button-row">
                        <button matButton="elevated" (click)="onSubmit()">Login</button>
                    </div>
                </form>
            }
            
        </mat-card-content>
      </mat-card>
  `,
})
export class LoginDemoComponent implements OnInit {

    loginForm: FormGroup;
    isLoggedIn = false;
    currentUser: string | null = null;

    constructor(private loginService: LoginService, private _snackBar: MatSnackBar) {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
        var token = this.loginService.getCurrentUser();
        if (token && token.sub) {
            console.log(token);
            this.isLoggedIn = true;
            this.currentUser = token.username;
        }
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        var context = {
            grant_type: 'password',
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        };

        this.loginService.login(context).subscribe(
            {
                next: token => {
                    this._snackBar.open("Login success welcome " + token.username, "close");
                    this.currentUser = token.username;
                    this.isLoggedIn = true;
                    this.loginService.setCurrentUser(token);
                    //localStorage.setItem('access_token', JSON.stringify(token));
                },
                error: err => {
                    this._snackBar.open("Login failed", "close");
                }
            });
    }

    onLogout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.loginService.logout();
    }

    getProfile() {
        this.loginService.getProfile().subscribe(
            {
                next: profile => {
                    this._snackBar.open("Profile: " + JSON.stringify(profile), "close");
                },
                error: err => {
                    this._snackBar.open("Get Profile failed", "close");
                }
            });
    }
}
