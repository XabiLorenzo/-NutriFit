import { Component, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Declaración de señales
  name = signal('');
  username = signal('');
  email = signal('');
  password = signal('');

  constructor(private router: Router) {}

  // Métodos para actualizar señales
  updateName(value: string) {
    this.name.update(() => value);
  }

  updateUsername(value: string) {
    this.username.update(() => value);
  }

  updateEmail(value: string) {
    this.email.update(() => value);
  }

  updatePassword(value: string) {
    this.password.update(() => value);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para manejar el registro
  onRegister(event: Event) {
    event.preventDefault();

    const registerData = {
      name: this.name(),
      username: this.username(),
      email: this.email(),
      password: this.password(),
    };

    if (
      registerData.name &&
      registerData.username &&
      registerData.email &&
      registerData.password
    ) {
      console.log('Intentando registrar con:', registerData);

      // Aquí iría la lógica para realizar la petición al API Gateway
      // Ejemplo ficticio:
      // this.authService.register(registerData).subscribe(
      //   (response) => {
      //     alert('Usuario registrado exitosamente');
      //     this.router.navigate(['/login']);
      //   },
      //   (error) => {
      //     console.error('Error durante el registro', error);
      //     alert('Hubo un problema al registrarse. Inténtalo de nuevo.');
      //   }
      // );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
