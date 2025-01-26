import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../../services/task-service/task-service.service';

@Component({
	selector: 'app-results',
	imports: [CommonModule],
	templateUrl: './results.component.html',
	styleUrl: './results.component.css',
})
export class ResultsComponent {
	taskType: string = '';
	tasks: any[] = []; // Store tasks fetched from the backend
	taskId: string = ''; // Store the taskID from the URL
	loading: boolean = true; // To show loading state
	errorMessage: string = ''; // For error handling
	taskSrc: string = '';
	taskDst: string = '';
	explanation = '';

	constructor(private route: ActivatedRoute, private http: HttpClient) {}

	taskService = inject(TaskService);

	ngOnInit() {
		// Get taskID from the route
		this.route.paramMap.subscribe((params) => {
			this.taskId = params.get('taskID') || ''; // Retrieve 'taskID'
			if (this.taskId) {
				this.fetchTaskData(); // Fetch data for the given taskID
			} else {
				this.errorMessage = 'Task ID not found';
				this.loading = false;
			}
		});
	}

	fetchTaskData() {
		// Here, ` must be used because using ' would treat ${} as a string literal
		// For local testing
		// this.http.get(`http://localhost:3000/${this.taskId}.json`)//tasks/get-answers-of-task-by-id/${this.taskId}')
		// For deployment

		this.taskService.getTypeOfTaskByID(this.taskId).subscribe((data) => {
			this.taskType = data.type;
		});

		this.taskService.getAnswersOfTaskByID(this.taskId).subscribe({
			next: (data) => {
				console.log(data);
				this.tasks = data.answers || []; // Ensure tasks array is set even if answers is undefined
				this.loading = false;
				this.processTasks(this.tasks);
			},
			error: (error) => {
				this.errorMessage =
					'Failed to fetch data, try to refresh the page.';
				console.error(error); // Log the error for debugging
				this.loading = false; // Stop loading spinner even in case of an error
			},
		});
	}

	processTasks(tasks: any[]) {
		this.tasks = tasks.map((task) => {
			console.log(task);
			// Split the taskName by spaces and take the second word if it exists
			const taskName = task.taskName;

			switch (this.taskType) {
				case 'bin-dec':
					this.taskSrc = 'binary';
					this.taskDst = 'decimal';
					break;
				case 'bin-hex':
					this.taskSrc = 'binary';
					this.taskDst = 'hexadecimal';
					break;
				case 'dec-bin':
					this.taskSrc = 'decimal';
					this.taskDst = 'binary';
					break;
				case 'dec-hex':
					this.taskSrc = 'decimal';
					this.taskDst = 'hexadecimal';
					break;
				case 'hex-bin':
					this.taskSrc = 'hexadecimal';
					this.taskDst = 'binary';
					break;
				case 'hex-dec':
					this.taskSrc = 'hexadecimal';
					this.taskDst = 'decimal';
					break;
				default:
					this.taskSrc = 'unknown';
					this.taskDst = 'unknown';
					break;
			}

			return {
				...task,
				givenAnswer: task.givenAnswer, // Default empty givenAnswer to "0"
				expanded: false, // Add expanded property
				correct: task.givenAnswer === task.correctAnswer, // Check if givenAnswer matches correctAnswer
				taskName, // Only set the second word of taskName
			};
		});
	}

	get performanceMessage(): string {
		const correctCount = this.tasks.filter((task) => task.correct).length;

		if (correctCount === 10) {
			return 'Excellent! You got all answers correct!';
		} else if (correctCount >= 8) {
			return 'Great job! You scored above 80%';
		} else if (correctCount >= 5) {
			return 'Good effort! You scored above 50%';
		} else {
			return 'Keep practicing! You can improve!';
		}
	}

	toggleExpand(selectedTask: any) {
		// Reset all tasks' expanded state to false
		if (selectedTask.expanded) {
			this.tasks.forEach((task) => (task.expanded = false));
		} else {
			this.tasks.forEach((task) => (task.expanded = false));
			// Set the selected task's expanded state to true
			selectedTask.expanded = true;
		}

		this.explanation = '';
	}

	explainConversion(
		taskSrc: string,
		taskDst: string,
		taskName: string,
		correctAnswer: string
	): string {
		let explanation = `Converting ${taskName} from ${taskSrc} to ${taskDst}:\n`;

		const givenTask = taskName; //.split(' ')[1];
		// Binary to Decimal
		if (taskSrc === 'binary' && taskDst === 'decimal') {
			explanation = this.convertBinaryToDecimalExplanation(
				givenTask,
				correctAnswer
			);
		}
		// Decimal to Binary
		else if (taskSrc === 'decimal' && taskDst === 'binary') {
			explanation = this.convertDecimalToBinaryExplanation(
				givenTask,
				correctAnswer
			);
		}
		// Binary to Hexadecimal
		else if (taskSrc === 'binary' && taskDst === 'hexadecimal') {
			explanation = this.convertBinaryToHexExplanation(
				givenTask,
				correctAnswer
			);
		}
		// Hexadecimal to Binary
		else if (taskSrc === 'hexadecimal' && taskDst === 'binary') {
			explanation = this.convertHexToBinaryExplanation(
				givenTask,
				correctAnswer
			);
		}
		// Decimal to Hexadecimal
		else if (taskSrc === 'decimal' && taskDst === 'hexadecimal') {
			explanation = this.convertDecimalToHexExplanation(
				givenTask,
				correctAnswer
			);
		}
		// Hexadecimal to Decimal
		else if (taskSrc === 'hexadecimal' && taskDst === 'decimal') {
			explanation = this.convertHexToDecimalExplanation(
				givenTask,
				correctAnswer
			);
		}

		return explanation;
	}

	// binary to decimal
	convertBinaryToDecimalExplanation(binary: string, decimal: string): string {
		let explanation = '';
		const binaryDigits = binary.split('').reverse();
		explanation += `Converting binary ${binary} to decimal:<br>`;

		let steps = [];
		for (let i = 0; i < binaryDigits.length; i++) {
			if (binaryDigits[i] === '1') {
				steps.push(`2^${i} = ${Math.pow(2, i)}`);
			}
		}

		explanation += `The positions with 1 in the binary number are:<br>`;
		explanation += steps.join('<br>') + '<br>';

		explanation += `Now, add up those values:<br>`;
		explanation +=
			steps.map((step) => step.split('=')[1].trim()).join(' + ') +
			` = ${decimal}`;
		return explanation;
	}

	// decimal to binary  other way around
	convertDecimalToBinaryExplanation(decimal: string, binary: string): string {
		let explanation = '';
		let num = parseInt(decimal, 10);
		let steps = [];

		explanation += `Converting decimal ${decimal} to binary:<br>`;
		explanation += `Keep dividing the number by 2 and record the remainders:<br>`;

		while (num > 0) {
			const remainder = num % 2;
			steps.push(
				`${num} ÷ 2 = ${Math.floor(num / 2)} (remainder: ${remainder})`
			);
			num = Math.floor(num / 2);
		}

		explanation += steps.join('<br>') + '<br>'; // Removed `.reverse()`
		explanation += `Now, write the remainders in reverse order: ${binary}`;
		return explanation;
	}

	// binary to hex
	convertBinaryToHexExplanation(binary: string, hex: string): string {
		let explanation = '';
		explanation += `Converting binary ${binary} to hexadecimal:<br>`;

		explanation += `Group the binary digits into groups of 4 (starting from the right):<br>`;
		const paddedBinary = binary.padStart(
			Math.ceil(binary.length / 4) * 4,
			'0'
		);
		const groups = paddedBinary.match(/.{1,4}/g) || [];

		explanation += groups.join(' ') + '<br>';
		explanation += `Convert each group to its hexadecimal equivalent:<br>`;

		const hexValues = groups.map(
			(group) =>
				`${group} = ${parseInt(group, 2).toString(16).toUpperCase()}`
		);
		explanation += hexValues.join('<br>') + '<br>';

		explanation += `Combine the hexadecimal values to get the result: ${hex}`;
		return explanation;
	}

	// hex to binary
	convertHexToBinaryExplanation(hex: string, binary: string): string {
		let explanation = '';
		explanation += `Converting hexadecimal ${hex} to binary:<br>`;

		explanation += `Convert each hexadecimal digit to its 4-bit binary equivalent:<br>`;
		const binaryValues = hex
			.split('')
			.map(
				(char) =>
					`${char} = ${parseInt(char, 16)
						.toString(2)
						.padStart(4, '0')}`
			);
		explanation += binaryValues.join('<br>') + '<br>';

		explanation += `Combine the binary values to get the result: ${binary}`;
		return explanation;
	}

	// decimal to hex
	convertDecimalToHexExplanation(decimal: string, hex: string): string {
		let explanation = '';
		let decValue = parseInt(decimal, 10);
		explanation += `Converting decimal ${decimal} to hexadecimal:<br>`;

		let steps = [];
		while (decValue > 0) {
			const remainder = decValue % 16;
			steps.push(
				`${decValue} ÷ 16 = ${Math.floor(
					decValue / 16
				)} remainder ${remainder} (${remainder
					.toString(16)
					.toUpperCase()})`
			);
			decValue = Math.floor(decValue / 16);
		}

		explanation += `Divide the decimal number by 16 repeatedly and note the remainders:<br>`;
		explanation += steps.reverse().join('<br>') + '<br>';

		explanation += `Write the remainders from bottom to top to get the result: ${hex}`;
		return explanation;
	}

	// hex to decimal
	convertHexToDecimalExplanation(hex: string, decimal: string): string {
		let explanation = '';
		explanation += `Converting hexadecimal ${hex} to decimal:<br>`;

		const hexDigits = hex.split('').reverse();
		explanation += `Break the hexadecimal number into its digits and calculate their decimal values:<br>`;

		let steps = hexDigits.map(
			(digit, i) =>
				`${digit} × 16^${i} = ${parseInt(digit, 16) * Math.pow(16, i)}`
		);
		explanation += steps.join('<br>') + '<br>';

		explanation += `Add up these values to get the result: ${decimal}`;
		return explanation;
	}
}
