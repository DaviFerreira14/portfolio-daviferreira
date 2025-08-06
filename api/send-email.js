const nodemailer = require('nodemailer');

// Domínios permitidos
const allowedOrigins = [
  'https://portfolio-daviferreira.vercel.app',
  'https://portfolio-davi-ferreira.vercel.app',
  'http://localhost:4200',
  'http://localhost:3000'
];

// Função para configurar CORS
const setCORSHeaders = (req, res) => {
  const origin = req.headers.origin;
  
  // Permitir origens específicas ou todas se não houver origin (Postman, etc.)
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
};

module.exports = async (req, res) => {
  // Configurar CORS
  setCORSHeaders(req, res);
  
  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Apenas aceitar requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido. Use POST.' 
    });
  }
  
  try {
    console.log('Iniciando processo de envio de email...');
    console.log('Body recebido:', req.body);
    
    // Verificar se as variáveis de ambiente existem
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Variáveis de ambiente não encontradas:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      });
      return res.status(500).json({ 
        success: false, 
        message: 'Configuração de email não encontrada no servidor' 
      });
    }

    const { name, email, message } = req.body;

    // Validação dos campos
    if (!name || !email || !message) {
      console.log('Campos obrigatórios faltando:', { name: !!name, email: !!email, message: !!message });
      return res.status(400).json({ 
        success: false, 
        message: 'Todos os campos são obrigatórios (nome, email, mensagem)' 
      });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    console.log('Criando transporter do nodemailer...');
    
    // Configuração do transporter do Nodemailer
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verificar se o transporter está funcionando
    console.log('Verificando conexão com o Gmail...');
    await transporter.verify();
    console.log('Conexão com Gmail verificada com sucesso!');

    // Configuração do email
    const mailOptions = {
      from: `"Portfolio Contato" <${process.env.EMAIL_USER}>`,
      to: 'davi073ferreira@gmail.com',
      replyTo: email,
      subject: `Novo contato via Portfolio - ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Novo Contato - Portfolio</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8f9fa;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .header {
              background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            
            .header p {
              font-size: 16px;
              opacity: 0.9;
            }
            
            .content {
              padding: 40px 30px;
            }
            
            .contact-info {
              background-color: #f8f9fa;
              border-radius: 8px;
              padding: 25px;
              margin-bottom: 30px;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              padding: 12px 0;
              border-bottom: 1px solid #e9ecef;
            }
            
            .contact-item:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
            
            .contact-label {
              font-weight: 600;
              color: #495057;
              min-width: 80px;
              margin-right: 15px;
            }
            
            .contact-value {
              color: #212529;
              flex: 1;
              word-break: break-word;
            }
            
            .message-section {
              background-color: #ffffff;
              border: 2px solid #e9ecef;
              border-radius: 8px;
              padding: 25px;
              margin-bottom: 30px;
            }
            
            .message-section h3 {
              color: #495057;
              font-size: 18px;
              margin-bottom: 15px;
              font-weight: 600;
            }
            
            .message-content {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 6px;
              border-left: 4px solid #4a90e2;
              line-height: 1.7;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            
            .footer {
              background-color: #f8f9fa;
              padding: 25px 30px;
              text-align: center;
              border-top: 1px solid #e9ecef;
            }
            
            .footer p {
              color: #6c757d;
              font-size: 14px;
            }
            
            .timestamp {
              background-color: #e9ecef;
              padding: 8px 16px;
              border-radius: 20px;
              display: inline-block;
              font-size: 12px;
              color: #495057;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Novo Contato</h1>
              <p>Mensagem recebida através do seu portfolio</p>
            </div>
            
            <div class="content">
              <div class="contact-info">
                <div class="contact-item">
                  <span class="contact-label">👤 Nome:</span>
                  <span class="contact-value">${name}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">📧 Email:</span>
                  <span class="contact-value">${email}</span>
                </div>
              </div>
              
              <div class="message-section">
                <h3>💬 Mensagem:</h3>
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>
                <span class="timestamp">📅 ${new Date().toLocaleString('pt-BR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'America/Sao_Paulo'
                })}</span>
              </p>
              <p style="margin-top: 10px; font-size: 12px; color: #adb5bd;">
                Enviado automaticamente pelo sistema de contato do portfolio
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Versão em texto plano como fallback
      text: `
        Novo contato via Portfolio
        
        Nome: ${name}
        Email: ${email}
        
        Mensagem:
        ${message}
        
        Enviado em: ${new Date().toLocaleString('pt-BR')}
      `
    };

    console.log('Enviando email...');
    
    // Enviar email
    const result = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado com sucesso! Message ID:', result.messageId);

    // Resposta de sucesso
    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado com sucesso! Entrarei em contato em breve.',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Erro detalhado ao enviar email:', {
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack
    });
    
    // Diferentes tipos de erro
    let errorMessage = 'Erro interno do servidor. Tente novamente.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Erro de autenticação do email. Configuração incorreta.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Erro de conexão com o servidor de email.';
    } else if (error.response && error.response.includes('550')) {
      errorMessage = 'Email rejeitado pelo servidor.';
    }
    
    return res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};