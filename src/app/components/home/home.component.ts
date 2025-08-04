import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() isDarkTheme = false;

  profile = {
    name: 'Davi Ferreira',
    profession: 'Desenvolvedor Full-Stack'
  };

  profileImageUrl = 'https://avatars.githubusercontent.com/DaviFerreira14?v=4';

  getProfileImage(): string {
    const githubUsername = 'DaviFerreira14';
    const githubAvatarUrl = `https://avatars.githubusercontent.com/${githubUsername}?v=4`;
    const fallbackImage = 'assets/images/profile-placeholder.jpg';
    
    return githubAvatarUrl;
  }

  onImageError(event: any): void {
    console.log('Erro ao carregar imagem do GitHub, usando placeholder');
    event.target.src = 'assets/images/profile-placeholder.jpg';
  }
}