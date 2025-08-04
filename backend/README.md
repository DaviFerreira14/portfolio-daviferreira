# Backend do Portfolio - Sistema de Envio de Emails

Este é o backend para o sistema de contato do portfolio, responsável por enviar emails quando o usuário preenche o formulário.

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
EMAIL_USER=davi073ferreira@gmail.com
EMAIL_PASS=sua_senha_de_app_aqui
PORT=3001
```

### 3. Configurar Senha de App do Gmail

Para usar o Gmail para enviar emails, você precisa criar uma "Senha de App":

1. Acesse sua conta Google
2. Vá em "Segurança"
3. Ative a "Verificação em duas etapas" se não estiver ativa
4. Vá em "Senhas de app"
5. Gere uma nova senha para "Email"
6. Use essa senha no campo `EMAIL_PASS` do arquivo `.env`

### 4. Executar o servidor

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## Endpoints

### POST /api/send-email
Envia um email com os dados do formulário.

**Body:**
```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "message": "Mensagem do usuário"
}
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Email enviado com sucesso!"
}
```

### GET /api/test
Testa se o servidor está funcionando.

## Integração com o Frontend

No componente de contato do Angular, você precisará fazer uma requisição POST para `http://localhost:3001/api/send-email` com os dados do formulário. 