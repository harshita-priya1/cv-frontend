import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  constructor(private router: Router) {}

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
    console.log('Sign in form submitted');
    console.log(`email: ${form.value.name}`);
    console.log(`email: ${form.value.phone}`);
    console.log(`email: ${form.value.email}`);
    console.log(`password: ${form.value.password}`);
    form.reset();
  }
}
