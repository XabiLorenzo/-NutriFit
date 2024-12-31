import { Component, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = signal(''); // Declaración de Signal
  password = signal(''); // Declaración de Signal

  constructor(private router: Router) {}

  // Métodos para actualizar señales
  updateUsername(value: string) {
    this.username.update(() => value); // Usamos `update` para establecer el valor
  }

  updatePassword(value: string) {
    this.password.update(() => value); // Usamos `update` para establecer el valor
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Método para manejar el inicio de sesión
  onLogin(event: Event) {
    event.preventDefault();

    const username = this.username();
    const password = this.password();

    if (username && password) {
      console.log('Intentando iniciar sesión con:', { username, password });

      // Aquí iría la lógica para realizar la petición al API Gateway
      // Ejemplo ficticio:
      // this.authService.login({ username, password }).subscribe(
      //   (response) => { this.router.navigate(['/home']); },
      //   (error) => { console.error('Error en el inicio de sesión', error); }
      // );
    } else {
      alert('Por favor, introduce tu usuario y contraseña.');
    }
  }
}


