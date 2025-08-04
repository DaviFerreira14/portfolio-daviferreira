import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HomeComponent, AboutComponent, ProjectsComponent, SkillsComponent, ContactComponent, FooterComponent],
  template: `
    <app-navbar 
      [isDarkTheme]="isDarkTheme" 
      (themeChange)="toggleTheme()"
    ></app-navbar>

    <main [ngClass]="{'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme}">
      <!-- Seção Home -->
      <app-home [isDarkTheme]="isDarkTheme"></app-home>
      
      <!-- Seção Sobre -->
      <app-about [isDarkTheme]="isDarkTheme"></app-about>
      
      <!-- Seção Projetos -->
      <app-projects [isDarkTheme]="isDarkTheme"></app-projects>
      
      <!-- Seção Habilidades -->
      <app-skills [isDarkTheme]="isDarkTheme"></app-skills>
      
      <!-- Seção Contato -->
      <app-contact [isDarkTheme]="isDarkTheme"></app-contact>
    </main>
    
    <!-- Footer -->
    <div [ngClass]="{'dark-theme': isDarkTheme, 'light-theme': !isDarkTheme}">
      <app-footer [isDarkTheme]="isDarkTheme"></app-footer>
    </div>
  `,
       styles: [`
    main {
      transition: all 0.3s ease;
    }
  `]
})
export class AppComponent implements OnInit {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
