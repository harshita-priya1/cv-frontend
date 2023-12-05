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
  @Input() task: any; //to get the task object from the parent component
  constructor(private taskService: TaskService, private router: Router) {}
  onDelete() {
    console.log('Delete button clicked');
    const confirmDelete = confirm(
      'Do you really want to delete task ' + this.task.title + '?'
    ); //to confirm if the you want to delete the task
    if (!confirmDelete) {
      return;
    }
    this.taskService.deleteTask(this.task._id).subscribe(
      (response: any) => {
        console.log(response);

        if (response.status === 200) {
          console.log('Task deleted');
          this.router.routeReuseStrategy.shouldReuseRoute = () => false; //to reload the page since we are on the home page itself
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/home']);
        } else {
          alert('Error while deleting task: ' + response.error.message);
          console.log(response.error.message);
        }
      },
      (error: any) => {
        console.log(error.error.message);
        alert('Error while deleting task: ' + error.error.message);
      }
    );
  }
  onEdit() {
    //to go to the update task component
    console.log(this.task._id);
    this.router.navigate(['/update-task', this.task._id]);
  }
  changeStatus(): any {
    //to change the status of the task
    this.taskService.changeStatus(this.task._id).subscribe((response: any) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/home']);
    });
  }
}
