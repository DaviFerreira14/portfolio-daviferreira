export interface ProfileInfo {
  name: string;
  profession: string;
  description: string;
  location: string;
  education: string;
  experience: string;
  githubUrl: string;
  linkedinUrl: string;
  discordUrl?: string;
  techStack: string[];
  achievements: string[];
}

export const PROFILE_CONFIG: ProfileInfo = {
  name: 'Davi Ferreira',
  profession: 'Desenvolvedor Full-Stack',
  description: 'Formado pelo SENAI/BA, participante do programa Ford Enter no SENAI Cimatec e do curso de Desenvolvimento Mobile da UNIFEL com a Prefeitura de Salvador. Atualmente focado em desenvolvimento front-end com Angular e tecnologias modernas.',
  location: 'Salvador, Bahia, Brasil',
  education: 'SENAI/BA - Análise e Desenvolvimento de Sistemas',
  experience: 'Full-Stack Developer',
  githubUrl: 'https://github.com/DaviFerreira14',
  linkedinUrl: 'https://www.linkedin.com/in/davi-ferreira99',
  discordUrl: '#',
  techStack: [
    'Angular',
    'TypeScript',
    'Bootstrap',
    'JavaScript',
    'HTML/CSS',
    'Java',
    'Python',
    'MySQL',
    'Apache',
    'Maven',
    'Netlify'
  ],
  achievements: [
    'Formado pelo SENAI/BA',
    'Participante do programa Ford Enter no SENAI Cimatec',
    'Curso de Desenvolvimento Mobile da UNIFEL com a Prefeitura de Salvador',
    'Foco atual em desenvolvimento front-end'
  ]
}; 