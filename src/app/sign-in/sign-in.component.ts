import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../userServices/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    console.log('SignInComponent initialized');
    const accessToken = localStorage.getItem('accessToken'); //handle when expired
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
    console.log(`email: ${form.value.email}`);
    console.log(`password: ${form.value.password}`);
    this.userService.signIn(form.value.email, form.value.password).subscribe(
      (response: any) => {
        console.log('response', response);
        if (response.status && response.status === 200) {
          console.log(response);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/home']);
        } else {
          alert('Error while signing in!');
          console.log(response.message);
        }
      },
      (error: any) => {
        console.log(error.message);
        alert('Error while signing in!');
      }
    );
    form.reset();
    //check if valid
    // route to home page
    // else display error message
  }
}
