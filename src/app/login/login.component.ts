import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface LoginResponseDto {
  token: string; 
}

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // Sprawdź czy formularz jest poprawny
    if (this.loginForm.valid) {
      this.http.post<LoginResponseDto>(
        'http://localhost:8080/auth/login',
        this.loginForm.value
      ).subscribe({
        next: (response) => {
          // response.token – to nasz JWT otrzymany z backendu
          const jwt = response.token;
          console.log(jwt);
          localStorage.setItem('jwt', jwt);
        },
        error: (error) => {
          console.error('Błąd logowania', error);
        }
      });
    }
  }

}