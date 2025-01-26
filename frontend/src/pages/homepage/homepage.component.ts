import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CONVERSION_MODE_DATA } from '../../module/sharedconstants';
import { ButtonWithLinkComponent } from '../../components/button-with-link/button-with-link.component';
import { SolutioncountstatsComponent } from '../../components/solutioncountstats/solutioncountstats.component';

@Component({
	selector: 'app-homepage',
	imports: [
		CommonModule,
		ButtonWithLinkComponent,
		SolutioncountstatsComponent,
	],
	templateUrl: './homepage.component.html',
	styleUrl: './homepage.component.css',
})
export class HomepageComponent {
	labelLinkMap = CONVERSION_MODE_DATA;
}
