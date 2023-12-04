import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { TaskComponent } from '../task/task.component';
import { UserService } from '../userServices/user.service';
import { TaskService } from '../taskServices/task.service';
import { Router } from '@angular/router';

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
  tasks: object[] = [];

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Homepage initialized');
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('accessToken not found');
      this.router.navigate(['/sign-in']);
    } else {
      console.log('accessToken', accessToken);
    }
    this.taskService.getTasks().subscribe((response: any) => {
      console.log(response);
      // //setting access token
      // if (response.accessToken) {
      //   localStorage.setItem('accessToken', response.accessToken);
      // }
      if (response.status === 200) this.tasks = response.data;
    });
  }
  onLogout() {
    this.userService.logOut();
    localStorage.clear();
    this.router.navigate(['/sign-in']);
    //check if clicking on forward or back button of browser doesnt route back to home page
  }
  onAddTask() {
    console.log('Add task button clicked');
    this.router.navigate(['/create-task']);
    console.log('Navigated to create task page');
  }
}
