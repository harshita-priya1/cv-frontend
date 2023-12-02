import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CreateTaskComponent,
    UpdateTaskComponent,
    TaskComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tasks = [
    { title: 'Task 1', description: 'Description 1' },
    { title: 'Task 2', description: 'Description 2' },
    // add more tasks here
  ];

  constructor() {}

  ngOnInit(): void {}
}
