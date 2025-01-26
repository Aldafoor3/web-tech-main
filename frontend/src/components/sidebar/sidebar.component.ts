import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CONVERSION_MODE_DATA } from '../../module/sharedconstants';
import { ButtonWithLinkComponent } from '../button-with-link/button-with-link.component';
import { changeRoute } from '../../module/sharedconstants';

@Component({
	selector: 'app-sidebar',
	imports: [CommonModule, ButtonWithLinkComponent],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	router = inject(Router);
	sidebarLinkMap = CONVERSION_MODE_DATA;
	ngOnInit() {}

	navigateToHomepage = () => changeRoute(this.router, '', {});
}
