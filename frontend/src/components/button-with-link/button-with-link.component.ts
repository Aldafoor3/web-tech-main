import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { changeRoute } from '../../module/sharedconstants';

@Component({
	selector: 'app-button-with-link',
	imports: [],
	templateUrl: './button-with-link.component.html',
	styleUrl: './button-with-link.component.css',
})
export class ButtonWithLinkComponent {
	/*
	 * This component renders a button that also functions as a link.
	 * The button displays a text label, and when clicked, it navigates to the specified route.
	 * The navigation action is logged to the console for debugging purposes.
	 *
	 * text - The label displayed on the button.
	 * route - The route path to navigate to when the button is clicked.
	 * queryParams - The params that are additionally given as a query (after the ?)
	 */
	router = inject(Router);

	@Input() text: string = '';
	@Input() route: string = '';
	@Input() queryParams: Object = {};

	changeRoute = () => changeRoute(this.router, this.route, this.queryParams);
}
