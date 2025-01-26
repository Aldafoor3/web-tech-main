import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service.service';
import { Task } from '../../models/task';
import {
	AMOUNT_OF_EXERCISES_PER_TASK,
	CONVERSION_MODE_DATA,
} from '../../module/sharedconstants';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-solutioncountstats',
	imports: [CommonModule],
	templateUrl: './solutioncountstats.component.html',
	styleUrl: './solutioncountstats.component.css',
})
export class SolutioncountstatsComponent implements OnInit {
	taskService = inject(TaskService);

	/* Here are all of the tasks saved that were completed by clicking on "Submit".
  Tasks that were cancelled by quitting them without pressing "Submit" do not count. */
	allSolvedTasks: Task[] = [];

	/* Here is the breakdown of the amount of tasks solved by task conversion type.
  Out of this variable the HTML of the table in the template is generated. */
	breakDownByTaskType: { type: string; amount: number }[] = [];

	ngOnInit(): void {
		/* Firstly all the tasks in the database are fetched filtered
    by whether the answers were submitted. Based on the tasks
    which have been finished, the amounts of solved tasks by 
    conversion type is calculated */

		this.taskService.getAllTasks().subscribe((data) => {
			console.log(data);
			this.allSolvedTasks = data.filter((x) => {
				return x.tasks.length == AMOUNT_OF_EXERCISES_PER_TASK;
			});
			console.log(this.allSolvedTasks);

			this.breakDownByTaskType = this.calculateBreakDownByTaskType();
			console.log(this.breakDownByTaskType);
		});
	}

	calculateBreakDownByTaskType(): { type: string; amount: number }[] {
		let output: { type: string; amount: number }[] = [];
		CONVERSION_MODE_DATA.forEach((conversionType) => {
			let tasksSolvedOfSpecificType = this.allSolvedTasks.filter((x) => {
				return x.type == conversionType.abbreviation;
			});
			output.push({
				type: conversionType.label,
				amount: tasksSolvedOfSpecificType.length,
			});
		});

		console.log(output);
		return output;
	}
}
