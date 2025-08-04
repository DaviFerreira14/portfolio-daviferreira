# Portfolio Davi Ferreira

Um portfolio moderno e responsivo desenvolvido com Angular 20, Bootstrap 5 e TypeScript.

## 🚀 Funcionalidades

- **Tema Claro/Escuro**: Sistema de temas com persistência no localStorage
- **Navbar Responsiva**: Menu hamburger para dispositivos móveis
- **Efeitos Visuais**: 
  - Estrelas animadas no tema escuro
  - Partículas flutuantes no tema claro
- **Design Moderno**: Interface elegante com animações suaves
- **Totalmente Responsivo**: Funciona em todos os dispositivos

## 🏗️ Estrutura do Projeto

```
src/app/
├── components/
│   ├── navbar/
│   │   └── navbar.component.ts          # Componente da barra de navegação
│   ├── background-effects/
│   │   └── background-effects.component.ts  # Efeitos de fundo (estrelas/partículas)
│   └── home/
│       └── home.component.ts            # Seção Home com introdução e CTA
├── services/
│   ├── theme.service.ts                 # Gerenciamento de temas
│   └── scroll.service.ts                # Gerenciamento de scroll
├── config/
│   └── profile.config.ts                # Configuração do perfil
├── styles/
│   └── themes.css                       # Estilos dos temas
└── app.ts                               # Componente principal (simplificado)
```

## 🎨 Componentes

### NavbarComponent
- **Responsabilidades**: Navegação, menu mobile, toggle de tema
- **Inputs**: `isDarkTheme` - Estado do tema
- **Outputs**: `themeChange` - Evento de mudança de tema
- **Funcionalidades**: Menu hamburger, links de navegação, botão de tema

### BackgroundEffectsComponent
- **Responsabilidades**: Efeitos visuais de fundo
- **Inputs**: `isDarkTheme` - Controla qual efeito mostrar
- **Funcionalidades**: 
  - Estrelas, estrelas cadentes e constelações (tema escuro)
  - Partículas flutuantes (tema claro)

### HomeComponent
- **Responsabilidades**: Seção principal com introdução e chamada para ação
- **Inputs**: `isDarkTheme` - Estado do tema
- **Arquivos**: 
  - `home.component.ts` - Lógica do componente
  - `home.component.html` - Template HTML
  - `home.component.css` - Estilos CSS
- **Funcionalidades**: 
  - Introdução profissional com animações
  - Nome em cor azul com efeito de glow
  - Foto do perfil do GitHub
  - Tech stack interativo
  - Botões de CTA
  - Links sociais
  - Scroll indicator animado

## 🔧 Serviços

### ThemeService
- **Responsabilidades**: Gerenciamento centralizado do tema
- **Funcionalidades**: 
  - Persistência no localStorage
  - Observable para mudanças de tema
  - Toggle automático

### ScrollService
- **Responsabilidades**: Detecção de scroll
- **Funcionalidades**: 
  - Observable para estado de scroll
  - Otimizado com NgZone

## 🎯 Benefícios da Refatoração

### ✅ **Código Mais Limpo**
- Componente principal reduzido de ~600 linhas para ~30 linhas
- Responsabilidades bem definidas
- Fácil manutenção

### ✅ **Reutilização**
- Componentes podem ser reutilizados
- Serviços centralizados
- Estilos organizados

### ✅ **Performance**
- Lazy loading de componentes
- TrackBy functions para otimização
- NgZone para eventos de scroll

### ✅ **Manutenibilidade**
- Código modular
- Fácil de testar
- Fácil de estender

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
ng serve

# Build para produção
ng build
```

## 📱 Responsividade

- **Desktop**: Layout completo com todos os elementos
- **Tablet**: Navbar adaptada, elementos redimensionados
- **Mobile**: Menu hamburger, layout otimizado

## 🎨 Temas

### Tema Escuro
- Fundo preto sólido
- Estrelas animadas
- Efeitos de glow azul

### Tema Claro
- Gradiente suave
- Partículas flutuantes
- Efeitos de sombra

## 🔄 Próximos Passos

1. **Seções do Portfolio**:
   - Home
   - Sobre mim
   - Projetos
   - Habilidades
   - Contato

2. **Melhorias**:
   - Animações de entrada
   - Lazy loading de seções
   - SEO otimizado

## 📄 Licença

Este projeto está sob a licença MIT.
