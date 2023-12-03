import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../userServices/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    console.log('SignUpComponent initialized');
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      console.log('accessToken', accessToken);
      // Route to the homepage
      this.router.navigate(['/home']);
    } else {
      console.log('accessToken not found');
    }
  }
  onSubmit(form: NgForm) {
    console.log('Sign in form submitting...');
    console.log(`email: ${form.value.name}`);
    console.log(`email: ${form.value.phone}`);
    console.log(`email: ${form.value.email}`);
    console.log(`password: ${form.value.password}`);
    this.userService
      .signUp(
        form.value.email,
        form.value.password,
        form.value.name,
        form.value.phone
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 201) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/home']);
          } else {
            alert('Error while signing up!');
            console.log(response.message);
          }
        },
        (error: any) => {
          console.log(error.message);
          alert('Error while signing up!');
        }
      );
    form.reset();
  }
}
