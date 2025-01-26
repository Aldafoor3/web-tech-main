import { Component } from '@angular/core';
import { ButtonWithLinkComponent } from '../../../components/button-with-link/button-with-link.component';

@Component({
	selector: 'app-error.notfound',
	imports: [ButtonWithLinkComponent],
	templateUrl: './error.notfound.component.html',
	styleUrl: './error.notfound.component.css',
})

/**
 * The ErrorNotfoundComponent is displayed when the user navigates
 * to an invalid route. It provides meaningful feedback by informing
 * the user that the requested page does not exist.
 * Additionally, the component includes a button that links back to the homepage,
 * allowing the user to continue navigating the application.
 */
export class ErrorNotfoundComponent {}
