import { Component, Signal, computed, effect, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Food {
  id: string;
  name: string;
  image?: string;
  calories: number;
  protein: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  foods = signal<Food[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  constructor(private router: Router) {
    this.loadFoods();
  }

  // Simulación de carga de datos
  loadFoods() {
    this.loading.set(true);
    setTimeout(() => {
      try {
        this.foods.set([
          { id: '1', name: 'Manzana', image: '/assets/apple.png', calories: 52, protein: 0.3 },
          { id: '2', name: 'Plátano', image: '/assets/banana.png', calories: 96, protein: 1.3 },
          { id: '3', name: 'Brócoli', image: '/assets/broccoli.png', calories: 55, protein: 3.7 },
        ]);
        this.errorMessage.set(null);
      } catch (error) {
        this.errorMessage.set('Error al cargar los alimentos');
      } finally {
        this.loading.set(false);
      }
    }, 1000);
  }

  // Redirección al perfil
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // Redirección al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Detalles de un alimento
  viewDetails(foodId: string) {
    this.router.navigate(['/food', foodId]);
  }
}




