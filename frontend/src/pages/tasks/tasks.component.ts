import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	CONVERSION_MODE_DATA,
	AMOUNT_OF_EXERCISES_PER_TASK,
	API_URL,
} from '../../module/sharedconstants';
import { TaskService } from '../../services/task-service/task-service.service';
import { changeRoute } from '../../module/sharedconstants';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css'],
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class TasksComponent implements OnInit {
	taskID: string = '';
	taskType: string | null = '';
	answerInputs: string[] = Array(AMOUNT_OF_EXERCISES_PER_TASK).fill('');
	tasks: {
		index: number;
		taskName: string;
		correctAnswer: string;
	}[] = [];
	sourceBase: number = 0;
	targetBase: number = 0;

	router = inject(Router);
	route = inject(ActivatedRoute);
	taskService = inject(TaskService);

	ngOnInit() {
		this.taskID = this.route.snapshot.paramMap.get('taskID') ?? '';
		this.taskType = this.route.snapshot.paramMap.get('type');

		const entry = CONVERSION_MODE_DATA.find(
			(item) => item.abbreviation === this.taskType
		);

		if (entry) {
			this.sourceBase = entry.sourceBase;
			this.targetBase = entry.targetBase;
		}

		for (let i = 0; i < AMOUNT_OF_EXERCISES_PER_TASK; i++) {
			const randomNumber: number = this.generateRandomNumber();
			this.tasks.push({
				index: i,
				taskName: randomNumber.toString(this.sourceBase),
				correctAnswer: randomNumber.toString(this.targetBase),
			});
		}
	}

	generateRandomNumber(): number {
		return Math.floor(Math.random() * 1000);
	}

	async redirectToResults() {
		for (let i = 0; i < AMOUNT_OF_EXERCISES_PER_TASK; i++) {
			this.taskService
				.pushAnswerToTask(
					this.taskID,
					this.tasks[i].taskName,
					this.answerInputs[i],
					this.tasks[i].correctAnswer
				)
				.subscribe((response) => console.log(response.message));
		}

		changeRoute(this.router, `/results/${this.taskID}`, {});
	}

	getNameOfNumberBase(baseNumber: number) {
		switch (baseNumber) {
			case 2:
				return 'Binary';
			case 10:
				return 'Decimal';
			case 16:
				return 'Hexadecimal';
			default:
				return 'Invalid';
		}
	}
}
