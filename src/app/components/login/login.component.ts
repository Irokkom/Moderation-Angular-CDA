import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Credential } from '../../interfaces/credential';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get email() {
    return this.form.get('email')as FormControl;
  }
  get password() {
    return this.form.get('password')as FormControl;
  }
  
  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    const credential: Credential = {
      email: this.email.value,
      password: this.password.value
    } 
    this.authService.login(credential).subscribe((t) => {
      this.authService.setToken(t.token);
      this.router.navigate(['/moderation'])
    });
  }
}
