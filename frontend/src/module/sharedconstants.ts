import { Router } from '@angular/router';

export const API_URL = 'http://localhost:3000';

export const AMOUNT_OF_EXERCISES_PER_TASK = 10;

/*
 * This list saves the following data for each conversion mode:
 * label - Used for buttons and in text
 * abbreviation - Used for links and routing
 * sourceBase - Used to determine the number base to parse
 * 		the random number that was generated for the task to
 * targetBase - Used to determine the number base to parse
 * 		the expected result that is needed for a correct solution to
 */
export const CONVERSION_MODE_DATA = [
	{
		label: 'Binary to Decimal',
		abbreviation: 'bin-dec',
		sourceBase: 2,
		targetBase: 10,
	},
	{
		label: 'Binary to Hexadecimal',
		abbreviation: 'bin-hex',
		sourceBase: 2,
		targetBase: 16,
	},
	{
		label: 'Decimal to Binary',
		abbreviation: 'dec-bin',
		sourceBase: 10,
		targetBase: 2,
	},
	{
		label: 'Decimal to Hexadecimal',
		abbreviation: 'dec-hex',
		sourceBase: 10,
		targetBase: 16,
	},
	{
		label: 'Hexadecimal to Binary',
		abbreviation: 'hex-bin',
		sourceBase: 16,
		targetBase: 2,
	},
	{
		label: 'Hexadecimal to Decimal',
		abbreviation: 'hex-dec',
		sourceBase: 16,
		targetBase: 10,
	},
];

/*
 * This method declaration serves as a reusable method to implement linking behavior
 * Params:
 * router: The router that has been injected in the component which contains elements that navigate you around the application
 * newRoute: The destination path of the routing
 * queryParams: The query parameters that supply the routing (written after ? in key=value pairs combined with &)
 *
 * To use this method, do following steps:
 * 1. If not done already, inject the Router service in the component where you want to use this method
 * 2. Import this method by writing import { changeRoute } from '../../module/sharedconstants';.
 * 	Note that the amount of "../" in the folder path depends on how deeply the component is nested in the folder structure.
 * 3. To make the function callable from the HTML file in event bindings such as (click),
 *  write methodName = () => changeRoute(this.router, wantedRoute, wantedQueryParams) inside the class
 */
export const changeRoute = (
	router: Router,
	newRoute: string,
	queryParams: Object
) => {
	console.log(
		`Attempting to navigate to ${newRoute} with the params ${JSON.stringify(
			queryParams
		)}`
	);

	router.navigate([newRoute], { queryParams }).then(
		(success) => console.log('Navigation success:', success),
		(error) => console.error('Navigation error:', error)
	);
};
