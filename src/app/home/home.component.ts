import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateTaskComponent, UpdateTaskComponent, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
