// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { API_URL } from '../../module/sharedconstants';

@Injectable({
	providedIn: 'root',
})
export class TaskService {
	constructor(private http: HttpClient) {}

	// Fetch all tasks
	getAllTasks(): Observable<Task[]> {
		return this.http.get<Task[]>(`${API_URL}/tasks/get-all-tasks`);
	}

	// Create a new task
	createTask(type: string): Observable<{ message: string; taskID: string }> {
		return this.http.post<{ message: string; taskID: string }>(
			`${API_URL}/tasks/create-task`,
			{ type }
		);
	}

	// Push an answer to a task
	pushAnswerToTask(
		taskID: string,
		taskName: string,
		givenAnswer: string,
		correctAnswer: string
	): Observable<{ message: string }> {
		return this.http.put<{ message: string }>(
			`${API_URL}/tasks/push-answer`,
			{
				taskID,
				taskName,
				givenAnswer,
				correctAnswer,
			}
		);
	}

	// Get answers of a specific task by ID
	getAnswersOfTaskByID(
		taskID: string
	): Observable<{ answers: Task['tasks'] }> {
		return this.http.get<{ answers: Task['tasks'] }>(
			`${API_URL}/tasks/get-answers-of-task-by-id`,
			{ params: { taskID } }
		);
	}

	getTypeOfTaskByID(taskID: string): Observable<{ type: string }> {
		return this.http.get<{ type: string }>(
			`${API_URL}/tasks/get-type-of-task-by-id`,
			{
				params: { taskID },
			}
		);
	}
}
