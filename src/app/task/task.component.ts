import { Component, Input } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { TaskService } from '../taskServices/task.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: any;
  constructor(private taskService: TaskService, private router: Router) {}
  onDelete() {
    console.log('Delete button clicked');
    this.taskService.deleteTask(this.task._id).subscribe(
      (response: any) => {
        console.log(response);

        if (response.status === 200) {
          console.log('Task deleted');
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/home']);
        } else {
          alert('Error while deleting task!');
          console.log(response.message);
        }
      },
      (error: any) => {
        console.log(error.message);
        alert('Error while deleting task!');
      }
    );
  }
  onEdit() {
    console.log(this.task._id);
    this.router.navigate(['/update-task', this.task._id]);
  }
  changeStatus(): any {
    this.taskService.changeStatus(this.task._id).subscribe((response: any) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/home']);
    });
  }
}
