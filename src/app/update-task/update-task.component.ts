import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
})
export class UpdateTaskComponent {
  constructor() {}

  onSubmit(form: NgForm) {
    console.log('Update task form submitted');
    console.log(`task name: ${form.value.title}`);
    console.log(`task description: ${form.value.description}`);
    console.log(`task date: ${form.value.endDate}`);
    console.log(`task status: ${form.value.completed}`);
    form.reset();
  }
}
