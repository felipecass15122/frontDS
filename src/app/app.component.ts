import { Component, OnInit  } from '@angular/core';
import { RouterOutlet, NavigationEnd  } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trabalhoFinal-app';
}
