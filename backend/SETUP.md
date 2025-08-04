# Configuração Segura do Backend

## 🔐 Configuração das Credenciais

### 1. Criar arquivo .env
Copie o arquivo `env.example` para `.env`:
```bash
cp env.example .env
```

### 2. Configurar Senha de App do Gmail

**IMPORTANTE**: NUNCA use sua senha normal do Gmail. Use uma "Senha de App":

1. Acesse: https://myaccount.google.com/security
2. Ative a **Verificação em duas etapas** (se não estiver ativa)
3. Vá em **Senhas de app**
4. Gere uma nova senha para "Email"
5. Use essa senha no arquivo `.env`

### 3. Editar o arquivo .env
```env
EMAIL_USER=davi073ferreira@gmail.com
EMAIL_PASS=sua_senha_de_app_gerada_aqui
PORT=3001
```

## 🚀 Como Executar

### Instalar dependências:
```bash
npm install
```

### Executar em desenvolvimento:
```bash
npm run dev
```

### Executar em produção:
```bash
npm start
```

## 🔒 Segurança

- ✅ O arquivo `.env` está no `.gitignore`
- ✅ Nunca commite credenciais no Git
- ✅ Use sempre senhas de app do Gmail
- ✅ O arquivo `env.example` serve apenas como template

## 🧪 Testar

Após configurar, teste acessando:
```
http://localhost:3001/api/test
```

Deve retornar: `{"message": "Backend funcionando!"}` 