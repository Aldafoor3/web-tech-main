import { Routes } from '@angular/router';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { ErrorNotfoundComponent } from '../pages/errors/error.notfound/error.notfound.component';
import { TasksComponent } from '../pages/tasks/tasks.component';
import { TutorialComponent } from '../pages/tutorial/tutorial.component';
import { ResultsComponent } from '../pages/results/results.component';

export const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: ':type/tutorial', component: TutorialComponent },
	{ path: ':type/tasks/:taskID', component: TasksComponent },
	{ path: 'results/:taskID', component: ResultsComponent },
	{ path: '**', component: ErrorNotfoundComponent },
];
