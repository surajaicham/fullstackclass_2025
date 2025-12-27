import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { merge, map } from "rxjs";

@Component({
    selector: "form-component",
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div>
            Hello World from Form Component!.
            <br/>
            Current Id: {{currentId}}
        </div>
        <br/>
        <br/>
        <form [formGroup]="profileForm" >
            <label>Name: </label>
            <input type="text" formControlName="name"/>
            @if(profileForm.controls['name'].invalid 
                && profileForm.controls['name'].touched) {
                    <span style="color:red;"> Data invalid </span>
            }
            <br/>
            <label>Age: </label>
            <input type="number" formControlName="age" />
            <br/>
            <label>Email: </label>
            <input type="text" formControlName="email" />
            @if(profileForm.controls['email'].invalid 
                && profileForm.controls['email'].touched) {
                    <span style="color:red;"> Data invalid </span>
            }
            <br/>
            <div formArrayName="addresses">
            @for(address of addresses.controls; track address; let i=$index) {
                <div [formGroupName]="i">
                    Province: <input type="text" formControlName="province" >
                    District: <input type="text" formControlName="district" >
                </div>
            }
            </div>
            <br/>
            <button (click)="addAddress()">Add</button>
            
            <br/>
            <button type="submit"
                    (click)="submitProfile()" >
                Submit
            </button>
        </form>

        <br/>
        <button (click)="observeSample()">observeSample</button>
    `
})
export class FormDemoComponent {
    currentId: string | null = null;
    profileForm: FormGroup;

    array = [1, 2, 3, 4, 5];
    array2 = ["A", "B", "C", "D"];

    constructor(
        private route: ActivatedRoute
        , private httpService: HttpClient
    ) {
        this.route.paramMap.subscribe(params => {
            this.currentId = params.get('id');
        });


        this.profileForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            age: new FormControl(0),
            addresses: new FormArray([])
        });
    }

    get addresses() {
        return this.profileForm.get('addresses') as FormArray;
    }

    // get addressControls(): FormArray {
    //     return this.profileForm.get('addressControls') as FormArray;
    // }


    observeSample() {
        let observe1 = this.httpService.get("https://meowfacts.herokuapp.com/?count=2");
        let observe2 = this.httpService.get("https://meowfacts.herokuapp.com/?count=2");

        merge(observe1, observe2).subscribe(res => {
            alert(JSON.stringify(res));
        })

        let mappedForFirstObject = observe1.pipe(map(val => {
            let obj = JSON.parse(JSON.stringify(val));
            return obj.data[0];
        }));

        mappedForFirstObject.subscribe(x => {
            alert(x);
        })
    }

    addAddress() {
        this.addresses.push(new FormGroup({
            province: new FormControl("", Validators.required),
            district: new FormControl("", Validators.required),
        }));
    }

    submitProfile() {
        console.log(this.profileForm);
        alert(JSON.stringify(this.profileForm.getRawValue()));
    }
}