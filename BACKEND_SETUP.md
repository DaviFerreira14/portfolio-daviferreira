# Configuração do Backend para Envio de Emails

## 📋 Passos para Configurar

### 1. Instalar Dependências do Backend
```bash
cd backend
npm install
```

### 2. Configurar Senha de App do Gmail

**IMPORTANTE:** Para enviar emails via Gmail, você precisa criar uma "Senha de App":

1. Acesse sua conta Google: https://myaccount.google.com/
2. Vá em **"Segurança"**
3. Ative a **"Verificação em duas etapas"** se não estiver ativa
4. Vá em **"Senhas de app"**
5. Selecione **"Email"** como aplicativo
6. Clique em **"Gerar"**
7. **Copie a senha gerada** (16 caracteres)

### 3. Criar Arquivo de Configuração

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
EMAIL_USER=davi073ferreira@gmail.com
EMAIL_PASS=sua_senha_de_app_aqui
PORT=3001
```

**Substitua `sua_senha_de_app_aqui` pela senha de 16 caracteres que você gerou no passo anterior.**

### 4. Executar o Backend

```bash
cd backend
npm run dev
```

O servidor deve iniciar na porta 3001.

### 5. Testar o Backend

Acesse: http://localhost:3001/api/test

Deve retornar: `{"message":"Backend funcionando!"}`

## 🚀 Como Funciona

### Frontend (Angular)
- Usuário preenche o formulário
- Dados são enviados para `http://localhost:3001/api/send-email`
- Backend processa e envia email para `davi073ferreira@gmail.com`

### Backend (Node.js)
- Recebe dados do formulário
- Valida os campos
- Envia email via Gmail
- Retorna resposta de sucesso/erro

## 📧 Estrutura do Email

O email enviado terá:
- **Assunto:** "Novo contato via Portfolio - [Nome]"
- **De:** davi073ferreira@gmail.com
- **Para:** davi073ferreira@gmail.com
- **Conteúdo:** Nome, email e mensagem do usuário

## 🔧 Solução de Problemas

### Erro de Autenticação
- Verifique se a senha de app está correta
- Certifique-se de que a verificação em duas etapas está ativa

### Erro de CORS
- O backend já está configurado com CORS
- Se houver problemas, verifique se o frontend está acessando a URL correta

### Servidor não inicia
- Verifique se a porta 3001 não está sendo usada
- Execute `npm install` novamente se necessário

## 📁 Estrutura de Arquivos

```
backend/
├── server.js          # Servidor principal
├── config.js          # Configurações
├── package.json       # Dependências
├── README.md          # Documentação
└── .env              # Variáveis de ambiente (criar)
```

## 🎯 Próximos Passos

1. Configure a senha de app do Gmail
2. Crie o arquivo `.env`
3. Execute o backend
4. Teste o formulário no frontend
5. Verifique se os emails estão chegando

**Sucesso!** 🎉 