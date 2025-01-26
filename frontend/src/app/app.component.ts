import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [SidebarComponent, CommonModule, RouterModule],
})
export class AppComponent {
	title = 'client-app';
	router = inject(Router);
}
