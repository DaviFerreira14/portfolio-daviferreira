# 🚀 Guia de Deploy - Portfolio Davi Ferreira

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no GitHub
- Conta no Vercel/Netlify (gratuito)

## 🔧 Preparação para Deploy

### 1. Build de Produção
```bash
# Instalar dependências
npm install

# Build de produção
npm run build
```

### 2. Configurar Domínio
- Comprar domínio: `daviferreira.dev` ou similar
- Configurar DNS para apontar para o serviço de hosting

## 🌐 Opções de Deploy

### Opção 1: Vercel (Recomendado)
1. **Conectar GitHub**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Importe o repositório

2. **Configurações**:
   - Framework: Angular
   - Build Command: `npm run build`
   - Output Directory: `dist/portfolio-davi-ferreira/browser`
   - Install Command: `npm install`

3. **Variáveis de Ambiente**:
   ```
   NODE_ENV=production
   ```

### Opção 2: Netlify
1. **Deploy via GitHub**:
   - Acesse [netlify.com](https://netlify.com)
   - Conecte com GitHub
   - Selecione o repositório

2. **Configurações**:
   - Build command: `npm run build`
   - Publish directory: `dist/portfolio-davi-ferreira/browser`

### Opção 3: GitHub Pages
1. **Configurar Actions**:
   - Crie `.github/workflows/deploy.yml`
   - Configure build e deploy automático

## 🔍 SEO e Performance

### 1. Verificar SEO
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### 2. Submeter Sitemap
- Adicione sitemap no Google Search Console
- URL: `https://daviferreira.dev/sitemap.xml`

### 3. Google Analytics
- Configure Google Analytics 4
- Adicione o código no `index.html`

## 📱 PWA Configuration

### 1. Gerar Ícones
```bash
# Instalar pwa-asset-generator
npm install -g pwa-asset-generator

# Gerar ícones
pwa-asset-generator logo.png public/assets
```

### 2. Testar PWA
- Chrome DevTools > Application > Manifest
- Lighthouse > PWA audit

## 🔒 Segurança

### 1. HTTPS
- Configurar SSL/HTTPS (automático no Vercel/Netlify)
- Redirecionar HTTP para HTTPS

### 2. Headers de Segurança
```nginx
# Adicionar no servidor
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Monitoramento

### 1. Analytics
- Google Analytics 4
- Hotjar (opcional)
- Google Search Console

### 2. Performance
- Core Web Vitals
- PageSpeed Insights
- Real User Monitoring

## 🚀 Comandos Úteis

```bash
# Build local
npm run build

# Testar build local
npx http-server dist/portfolio-davi-ferreira/browser

# Verificar tamanho do bundle
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/portfolio-davi-ferreira/browser/stats.json
```

## 📝 Checklist de Deploy

- [ ] Build de produção funcionando
- [ ] Sitemap.xml configurado
- [ ] Robots.txt configurado
- [ ] Meta tags SEO implementadas
- [ ] Structured data (JSON-LD) configurado
- [ ] Favicon e ícones PWA gerados
- [ ] HTTPS configurado
- [ ] Google Search Console configurado
- [ ] Google Analytics configurado
- [ ] Testes de performance realizados
- [ ] Testes de responsividade realizados
- [ ] Links sociais funcionando
- [ ] Formulário de contato funcionando

## 🎯 Palavras-chave Otimizadas

- Davi Ferreira
- Davi Ferreira desenvolvedor
- Davi Ferreira analista
- Davi Ferreira programador
- Desenvolvedor Full Stack Salvador
- Analista de Sistemas Bahia
- Programador Angular Node.js
- Desenvolvimento Web Salvador 