import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Input() isDarkTheme = false;

  projects: Project[] = [
    {
      title: 'W&W Climatização',
      description: 'Site institucional responsivo para empresa de climatização. Apresenta serviços, produtos e contato com visual moderno e acessível.',
      image: 'wew.png',
      link: 'https://wewclimatizacao.com.br/',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
    },
    {
      title: 'Minha Garagem',
      description: 'Aplicação web para cadastro e gerenciamento de veículos com lembretes de manutenção. Utiliza Angular, Firebase e foco em usabilidade.',
      image: 'mg.png',
      link: 'https://minha-garagem.vercel.app/login',
      technologies: ['Angular', 'Firebase', 'TypeScript', 'Bootstrap']
    }
  ];

  openProject(link: string): void {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
}