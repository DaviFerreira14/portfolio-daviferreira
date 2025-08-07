const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
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
    
    // Verificar se as variáveis de ambiente existem
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Variáveis de ambiente não encontradas');
      return res.status(500).json({ 
        success: false, 
        message: 'Configuração de email não encontrada no servidor' 
      });
    }

    const { name, email, message } = req.body;

    // Validação dos campos
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos os campos são obrigatórios (nome, email, mensagem)' 
      });
    }

    // Configuração do transporter do Nodemailer
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Configuração do email
    const mailOptions = {
      from: `"Portfolio Contato" <${process.env.EMAIL_USER}>`,
      to: 'davi073ferreira@gmail.com',
      replyTo: email,
      subject: `Novo contato via Portfolio - ${name}`,
      html: `
        <h2>Novo contato via Portfolio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Enviado em: ${new Date().toLocaleString('pt-BR')}</small></p>
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
    console.error('Erro ao enviar email:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor. Tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};