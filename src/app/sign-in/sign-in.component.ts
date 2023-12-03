import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('SignInComponent initialized');
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
    console.log('Sign in form submitted');
    console.log(`email: ${form.value.email}`);
    console.log(`password: ${form.value.password}`);
    form.reset();
    //check if valid
    // route to home page
    // else display error message
  }
}
