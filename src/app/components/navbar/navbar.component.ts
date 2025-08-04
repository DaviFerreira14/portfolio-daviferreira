import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top" [ngClass]="{'navbar-dark': isDarkTheme, 'navbar-light': !isDarkTheme}">
      <div class="container">
        <!-- Logo/Nome na esquerda -->
        <a class="navbar-brand fw-bold" href="#">
          <span class="brand-text">Portfolio</span>
          <span class="brand-name">Davi Ferreira</span>
        </a>

        <!-- Botão hamburger para mobile -->
        <button 
          class="navbar-toggler" 
          type="button" 
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-controls="navbarNav" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Botões de navegação -->
        <div class="collapse navbar-collapse" [class.show]="isMobileMenuOpen" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item" *ngFor="let item of navItems">
              <a class="nav-link" [href]="item.href" (click)="closeMobileMenu()">
                <i [class]="item.icon"></i>
                <span>{{ item.text }}</span>
              </a>
            </li>
          </ul>

          <!-- Botão de tema na direita -->
          <div class="theme-toggle">
            <button 
              class="btn theme-btn" 
              (click)="toggleTheme()"
              [title]="isDarkTheme ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
            >
              <i class="bi" [ngClass]="isDarkTheme ? 'bi-sun-fill' : 'bi-moon-fill'"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    /* Navbar principal */
    .navbar {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem 0;
    }

    /* Brand/Logo */
    .navbar-brand {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1;
      transition: all 0.3s ease;
    }

    .brand-text {
      font-size: 0.9rem;
      font-weight: 300;
      opacity: 0.8;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .brand-name {
      font-size: 1.4rem;
      font-weight: 700;
      background: linear-gradient(45deg, #4a90e2, #7b68ee);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Links de navegação */
    .navbar-nav {
      gap: 0.5rem;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem !important;
      font-weight: 500;
      font-size: 0.95rem;
      border-radius: 25px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .nav-link i {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
    }

    .nav-link:hover i {
      transform: scale(1.2);
    }

    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .nav-link:hover::before {
      left: 100%;
    }

    /* Botão de tema */
    .theme-toggle {
      display: flex;
      align-items: center;
    }

    .theme-btn {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .theme-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
    }

    .theme-btn:hover::before {
      width: 100%;
      height: 100%;
    }

    .theme-btn:hover {
      transform: scale(1.1) rotate(180deg);
    }

    /* Botão hamburger */
    .navbar-toggler {
      border: none;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .navbar-toggler:focus {
      box-shadow: none;
    }

    .navbar-toggler-icon {
      transition: all 0.3s ease;
    }

    /* Estilos para tema escuro */
    .navbar-dark {
      background: rgba(0, 0, 0, 0.8) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .navbar-dark .navbar-brand {
      color: #ffffff;
    }

    .navbar-dark .nav-link {
      color: rgba(255, 255, 255, 0.8);
    }

    .navbar-dark .nav-link:hover {
      color: #4a90e2 !important;
      background: rgba(74, 144, 226, 0.1);
      transform: translateY(-2px);
    }

    .navbar-dark .theme-btn {
      border-color: #4a90e2;
      color: #4a90e2;
      background: rgba(74, 144, 226, 0.1);
    }

    .navbar-dark .theme-btn:hover {
      background: #4a90e2;
      color: #000000;
      box-shadow: 0 0 20px rgba(74, 144, 226, 0.5);
    }

    .navbar-dark .navbar-toggler {
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.1);
    }

    .navbar-dark .navbar-toggler:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Estilos para tema claro */
    .navbar-light {
      background: rgba(248, 249, 250, 0.95) !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .navbar-light .navbar-brand {
      color: #212529;
    }

    .navbar-light .navbar-brand .brand-name {
      background: linear-gradient(45deg, #007bff, #0056b3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-light .nav-link {
      color: rgba(0, 0, 0, 0.75);
      font-weight: 500;
    }

    .navbar-light .nav-link:hover {
      color: #0056b3 !important;
      background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.15));
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 123, 255, 0.15);
    }

    .navbar-light .nav-link i {
      color: #007bff;
    }

    .navbar-light .nav-link:hover i {
      color: #0056b3;
      transform: scale(1.2);
    }

    .navbar-light .theme-btn {
      border-color: #007bff;
      color: #007bff;
      background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.15));
      box-shadow: 0 2px 10px rgba(0, 123, 255, 0.1);
    }

    .navbar-light .theme-btn:hover {
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: #ffffff;
      box-shadow: 0 0 25px rgba(0, 123, 255, 0.4);
      transform: scale(1.05);
    }

    .navbar-light .navbar-toggler {
      color: rgba(0, 0, 0, 0.7);
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.08));
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .navbar-light .navbar-toggler:hover {
      background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.15));
      border-color: rgba(0, 123, 255, 0.3);
      transform: scale(1.05);
    }

    /* Responsividade */
    @media (max-width: 991.98px) {
      .navbar-brand {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .brand-text {
        font-size: 0.8rem;
      }

      .brand-name {
        font-size: 1.2rem;
      }

      .navbar-nav {
        gap: 0.25rem;
        margin: 1rem 0;
      }

      .nav-link {
        padding: 0.75rem 1rem !important;
        border-radius: 15px;
        justify-content: flex-start;
      }

      .nav-link i {
        font-size: 1rem;
      }

      .theme-toggle {
        margin-top: 1rem;
        justify-content: center;
      }

      .theme-btn {
        width: 40px;
        height: 40px;
        font-size: 1rem;
      }

      .navbar-collapse {
        background: inherit;
        border-radius: 15px;
        margin-top: 1rem;
        padding: 1rem;
      }
    }

    @media (max-width: 575.98px) {
      .navbar {
        padding: 0.75rem 0;
      }

      .brand-text {
        font-size: 0.7rem;
      }

      .brand-name {
        font-size: 1.1rem;
      }

      .nav-link {
        padding: 0.6rem 0.8rem !important;
        font-size: 0.9rem;
      }

      .nav-link i {
        font-size: 0.9rem;
      }

      .theme-btn {
        width: 35px;
        height: 35px;
        font-size: 0.9rem;
      }
    }

    /* Animações de entrada */
    .navbar-collapse.show {
      animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Animação do botão hamburger */
    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
      transform: rotate(45deg);
    }

    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::before {
      transform: rotate(90deg);
    }

    .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::after {
      transform: rotate(0deg);
    }

    /* Efeito de scroll */
    .navbar.scrolled {
      padding: 0.5rem 0;
      backdrop-filter: blur(25px);
    }

    .navbar.scrolled .navbar-brand {
      transform: scale(0.95);
    }
  `]
})
export class NavbarComponent {
  @Input() isDarkTheme = false;
  @Output() themeChange = new EventEmitter<void>();
  
  isMobileMenuOpen = false;

  navItems = [
    { text: 'Home', href: '#home', icon: 'bi bi-house-door' },
    { text: 'Sobre', href: '#about', icon: 'bi bi-person' },
    { text: 'Projetos', href: '#projects', icon: 'bi bi-folder' },
    { text: 'Habilidades', href: '#skills', icon: 'bi bi-gear' },
    { text: 'Contato', href: '#contact', icon: 'bi bi-envelope' }
  ];

  toggleTheme() {
    this.themeChange.emit();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
} 