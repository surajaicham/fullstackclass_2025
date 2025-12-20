import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Directive, DoCheck, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, signal, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'user-row',
  template: `<div>
    <hr />
    Name: {{userData.name}}
    <br/>
    Age: {{userData.age}}
    <br/>
    <button type="button" (click)="deleteUser()">
      Delete User
    </button>
  </div>
 `,
  imports: [CommonModule]
})
export class UserRow {
  @Input() userData!: User;
  @Output() userDeleted = new EventEmitter<User>();

  deleteUser() {
    this.userDeleted.emit(this.userData);
  }
}

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor') bg = '';
  @Input('appHighlight') highlightColor = 'yellow';

  @HostListener('mouseenter') onMouseEnter() {
    this.bg = this.highlightColor;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bg = '';
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, UserRow, HighlightDirective, CommonModule],
  template: `<div>
  <!-- <h1>Hello {{ name }}!</h1>
  <br/> -->
<!-- Data Binding
  <input type="text" [(ngModel)]="name" />
  <input type="text" value='{{name}}' readonly />
  <input type="text" [value]='name' readonly />

  <br/>
  <h2>Counter: {{ counter }}</h2>
  <br/>
  <button (click)="increaseCounter()">Increase Age</button>
  </div>
  
  <div>
    <input type="number" 
          [(ngModel)]="operand" 
          (change)="sum()" />
    +
    <input type="number" 
          [(ngModel)]="operand2" 
          (change)="sum()" />
    =
    <span>{{ result }}</span>
  </div> -->
  <div>
    <fieldset>
      <legend>Registration Form</legend>
      <div >
        <span appHighlight="lightgreen">Name:</span> <input type="text" placeholder="Name" [(ngModel)]="name" />
      </div>
      <div [ngClass]="{'has-value': age > 0}"
          [ngStyle]="{'font-style': age > 0 ? 'italic' : 'normal'}">
        Age: <input type="number" placeholder="Age" [(ngModel)]="age"/>
      </div>
      <button type="button" (click)="submit()">Submit</button>
    </fieldset>
  </div>
  <div>
    @if(users.length === 0) {
      <p>No users registered.</p>
    } @else {
        User List:
        @for(user of users; track user) {
          <user-row [userData]="user" 
                  (userDeleted)="onDeleteUser($event)"></user-row>
        }
    }
  </div>
 `
  ,
  styleUrl: './app.scss'
})
export class App implements OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy  {
  protected readonly title = signal('angular-fundamental');
  name: string = '';
  age: number = 0;
  counter: number = 0;
  operand: number = 0;
  operand2: number = 0;
  result: number = 0;
  users: User[] = [
  ];

  constructor() {
    console.log('Constructor called');
  }

  ngOnInit() {
    console.log('OnInit called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges called', changes);
  }

  ngDoCheck(): void {
    console.log('DoCheck called');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called');
  }

  ngOnDestroy(): void {
    alert('OnDestroy called');
  }

  submit() {
    let newUser: User = {
      name: this.name,
      age: this.age
    }

    this.users.push(newUser);

    // Clear the form
    this.name = '';
    this.age = 0;
  }

  onDeleteUser(userToDelete: User) {
    this.users = this.users.filter(user => user !== userToDelete);
  }
  // increaseCounter() {
  //   this.counter++;
  // }

  // sum() {
  //   this.result = this.operand + this.operand2;
  // }

}
