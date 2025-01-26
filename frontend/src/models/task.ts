export interface Task {
	_id: string;
	type: string;
	tasks: {
		index: number;
		taskName: string;
		givenAnswer?: string;
		correctAnswer: string;
	}[];
}
