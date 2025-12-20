import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'child-demo',
  standalone: true,
  template: `<div class="child">This is a child component!</div>`,
  imports: [CommonModule, FormsModule]
})
export class ChildDemoComponent {}


@Component({
  selector: 'app-components-demo',
  standalone: true,
  template: `
    <h2>Angular Components Demo</h2>
    <p>This component demonstrates how to create and use Angular components.</p>
    <ul>
      <li><b>Selector:</b> <code>app-components-demo</code></li>
      <li><b>Template:</b> Inline HTML in the <code>template</code> property</li>
      <li><b>Styles:</b> Inline CSS in the <code>styles</code> property</li>
    </ul>
    <child-demo></child-demo>
  `,
  styles: [`
    h2 { color: #1976d2; }
    ul { margin-bottom: 1em; }
    .child { background: #e3f2fd; padding: 1em; border-radius: 6px; }
  `],
  imports: [CommonModule, FormsModule, ChildDemoComponent]
})
export class ComponentsDemoComponent {}
