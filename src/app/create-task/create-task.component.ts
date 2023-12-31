import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { TaskService } from '../taskServices/task.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  constructor(private router: Router, private taskService: TaskService) {}

  onSubmit(form: NgForm) {
    //submitted to create task
    console.log('Creating task...');
    console.log(`task name: ${form.value.title}`);
    console.log(`task description: ${form.value.description}`);
    console.log(`task date: ${form.value.endDate}`);
    console.log(`task status: ${form.value.completed}`);
    this.taskService
      .createTask(
        form.value.title,
        form.value.description,
        form.value.completed,
        form.value.endDate
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 201) {
            this.router.navigate(['/home']);
          } else {
            alert('Error while creating task: ' + response.error.message);
            console.log(response.error.message);
          }
        },
        (error: any) => {
          console.log(error.error.message);
          alert('Error while creating task: ' + error.error.message);
        }
      );

    form.reset();
  }
}
