import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Star {
  size: string;
  left: number;
  top: number;
  delay: number;
}

interface Particle {
  size: string;
  left: number;
  top: number;
  delay: number;
}

@Component({
  selector: 'app-background-effects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Sistema de estrelas dinâmico para o tema escuro -->
    <div *ngIf="isDarkTheme" class="stars-container">
      <div 
        *ngFor="let star of stars; trackBy: trackByStar" 
        class="star" 
        [ngClass]="star.size"
        [style.left]="star.left + '%'"
        [style.top]="star.top + '%'"
        [style.animation-delay]="star.delay + 's'"
      ></div>
      
      <div 
        *ngFor="let shootingStar of shootingStars; trackBy: trackByShootingStar" 
        class="shooting-star"
        [style.left]="shootingStar.left + '%'"
        [style.top]="shootingStar.top + '%'"
        [style.animation-delay]="shootingStar.delay + 's'"
      ></div>
      
      <div 
        *ngFor="let constellation of constellations; trackBy: trackByConstellation" 
        class="constellation"
        [style.left]="constellation.left + '%'"
        [style.top]="constellation.top + '%'"
        [style.animation-delay]="constellation.delay + 's'"
      ></div>
    </div>

    <!-- Sistema de partículas flutuantes para o tema claro -->
    <div *ngIf="!isDarkTheme" class="particles-container">
      <div 
        *ngFor="let particle of particles; trackBy: trackByParticle" 
        class="particle" 
        [ngClass]="particle.size"
        [style.left]="particle.left + '%'"
        [style.top]="particle.top + '%'"
        [style.animation-delay]="particle.delay + 's'"
      ></div>
    </div>
  `,
  styles: [`
    /* Container das estrelas */
    .stars-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* Container das partículas */
    .particles-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* Estrelas normais */
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      opacity: 0;
      animation: twinkle 3s infinite;
    }

    .star.small {
      width: 1px;
      height: 1px;
      animation-duration: 2s;
    }

    .star.medium {
      width: 2px;
      height: 2px;
      animation-duration: 3s;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
    }

    .star.large {
      width: 3px;
      height: 3px;
      animation-duration: 4s;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.9);
    }

    /* Estrelas cadentes */
    .shooting-star {
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, transparent, white, transparent);
      border-radius: 50px;
      opacity: 0;
      animation: shoot 8s infinite;
    }

    /* Constelações (estrelas especiais) */
    .constellation {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #ffd700;
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
      animation: pulse 2s infinite alternate;
    }

    /* Partículas flutuantes para tema claro */
    .particle {
      position: absolute;
      background: linear-gradient(45deg, rgba(0, 123, 255, 0.3), rgba(0, 86, 179, 0.2));
      border-radius: 50%;
      opacity: 0;
      animation: float 6s infinite ease-in-out;
    }

    .particle.tiny {
      width: 2px;
      height: 2px;
      animation-duration: 8s;
    }

    .particle.small {
      width: 3px;
      height: 3px;
      animation-duration: 10s;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
    }

    .particle.medium {
      width: 4px;
      height: 4px;
      animation-duration: 12s;
      box-shadow: 0 0 12px rgba(0, 123, 255, 0.3);
    }

    /* Animações */
    @keyframes twinkle {
      0%, 100% { opacity: 0; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes shoot {
      0% {
        opacity: 0;
        transform: translateX(-100px) translateY(100px);
        width: 0;
      }
      10% {
        opacity: 1;
        width: 100px;
      }
      90% {
        opacity: 1;
        width: 100px;
      }
      100% {
        opacity: 0;
        transform: translateX(300px) translateY(-100px);
        width: 0;
      }
    }

    @keyframes pulse {
      0% { opacity: 0.6; transform: scale(1); }
      100% { opacity: 1; transform: scale(1.3); }
    }

    @keyframes float {
      0%, 100% { 
        opacity: 0; 
        transform: translateY(0px) translateX(0px) scale(1); 
      }
      25% { 
        opacity: 0.8; 
        transform: translateY(-20px) translateX(10px) scale(1.1); 
      }
      50% { 
        opacity: 0.6; 
        transform: translateY(-10px) translateX(-5px) scale(0.9); 
      }
      75% { 
        opacity: 0.9; 
        transform: translateY(-30px) translateX(15px) scale(1.2); 
      }
    }
  `]
})
export class BackgroundEffectsComponent implements OnInit {
  @Input() isDarkTheme = false;
  
  stars: Star[] = [];
  shootingStars: any[] = [];
  constellations: any[] = [];
  particles: Particle[] = [];

  ngOnInit() {
    this.initializeEffects();
  }

  ngOnChanges() {
    this.initializeEffects();
  }

  private initializeEffects() {
    if (this.isDarkTheme) {
      this.initializeStars();
    } else {
      this.initializeParticles();
    }
  }

  private initializeStars() {
    this.stars = [];
    this.shootingStars = [];
    this.constellations = [];
    this.particles = [];

    // Criar estrelas normais
    for (let i = 0; i < 200; i++) {
      this.stars.push(this.createStar());
    }

    // Criar estrelas cadentes
    for (let i = 0; i < 3; i++) {
      this.shootingStars.push(this.createShootingStar());
    }

    // Criar constelações
    for (let i = 0; i < 10; i++) {
      this.constellations.push(this.createConstellation());
    }
  }

  private initializeParticles() {
    this.stars = [];
    this.shootingStars = [];
    this.constellations = [];
    this.particles = [];

    for (let i = 0; i < 50; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createStar(): Star {
    const sizes = ['small', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    return {
      size: randomSize,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    };
  }

  private createShootingStar() {
    return {
      left: Math.random() * 50,
      top: Math.random() * 50,
      delay: Math.random() * 8
    };
  }

  private createConstellation() {
    return {
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    };
  }

  private createParticle(): Particle {
    const sizes = ['tiny', 'small', 'medium'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    return {
      size: randomSize,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4
    };
  }

  // Funções trackBy para otimização
  trackByStar(index: number, star: Star): number { return index; }
  trackByShootingStar(index: number, star: any): number { return index; }
  trackByConstellation(index: number, star: any): number { return index; }
  trackByParticle(index: number, particle: Particle): number { return index; }
} 