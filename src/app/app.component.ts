import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputTextModule, FloatLabelModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gsp-frontend';
}
