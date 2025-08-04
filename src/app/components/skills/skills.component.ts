import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  @Input() isDarkTheme = false;

  skillCategories: SkillCategory[] = [
    {
      name: 'Linguagens',
      icon: 'bi bi-code-slash',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      name: 'Frameworks',
      icon: 'bi bi-gear',
      skills: ['Angular', 'Node.js', 'Bootstrap']
    },
    {
      name: 'Banco de Dados',
      icon: 'bi bi-database',
      skills: ['Firebase', 'SQLite']
    },
    {
      name: 'Ferramentas',
      icon: 'bi bi-tools',
      skills: ['Git', 'GitHub', 'Figma', 'VSCode']
    }
  ];
} 