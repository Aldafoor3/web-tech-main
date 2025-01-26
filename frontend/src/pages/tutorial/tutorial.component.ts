import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonWithLinkComponent } from '../../components/button-with-link/button-with-link.component';
import { TaskService } from '../../services/task-service/task-service.service';

@Component({
	selector: 'app-tutorial',
	templateUrl: './tutorial.component.html',
	styleUrls: ['./tutorial.component.css'],
	standalone: true,
	imports: [CommonModule, ButtonWithLinkComponent],
})
export class TutorialComponent implements OnInit {
	taskService = inject(TaskService);
	route = inject(ActivatedRoute);
	taskID: string = '';
	type: string = '';

	ngOnInit() {
		/* Watch for the case if someone directly from the
		tutorial page changes the type of the tutorial via the sidebar buttons.
		If a different type has been selected, rerender the page */
		this.route.paramMap.subscribe((params) => {
			const newType = params.get('type') || '';
			if (newType !== this.type) {
				this.type = newType;
				console.log(`Type changed to: ${this.type}`);
				this.prepareTaskInDatabase();
			}
		});
	}

	prepareTaskInDatabase() {
		this.taskService.createTask(this.type).subscribe((response) => {
			this.taskID = response.taskID;
			console.log(response.message);
		});
	}
}
