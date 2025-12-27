import { Component, signal, Injectable } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Injectable({ providedIn: 'root'})
export class CounterService {
  private _count: number = 0;
  get count() { return this._count;  }
  increase() {this._count++;}
  decrease() {this._count--;}
  reset() {this._count = 0;}
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-fundamental2');
   constructor(public counter: CounterService) {
    
  }

  getCurrentValue() {
    return this.counter.count;
  }

  increase() {
    this.counter.increase();
  }

  decrease() {
    this.counter.decrease();
  }
}
