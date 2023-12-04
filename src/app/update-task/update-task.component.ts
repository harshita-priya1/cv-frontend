import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { TaskService } from '../taskServices/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
})
export class UpdateTaskComponent implements OnInit {
  id: string;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit() {
    console.log('Update task component initialized', this.id);
  }

  onSubmit(form: NgForm) {
    console.log('Updating task...');
    console.log(`task name: ${form.value.title}`);
    console.log(`task description: ${form.value.description}`);
    console.log(`task date: ${form.value.endDate}`);
    this.taskService
      .updateTask(
        this.id,
        form.value.title,
        form.value.description,
        form.value.endDate
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.router.navigate(['/home']);
          } else {
            alert('Error while updating task!');
            console.log(response.message);
          }
        },
        (error: any) => {
          console.log(error.message);
          alert('Error while updating task!');
        }
      );

    form.reset();
  }
}
