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
  
  // Permitir origens específicas ou todas se não houver origin
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
  
  // Apenas aceitar requisições GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido. Use GET.' 
    });
  }
  
  try {
    const response = {
      success: true,
      message: 'Backend funcionando perfeitamente! 🚀',
      timestamp: new Date().toISOString(),
      timestampBR: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      cors: 'Configurado corretamente ✅',
      allowedOrigins: allowedOrigins,
      environment: process.env.NODE_ENV || 'production',
      vercel: {
        region: process.env.VERCEL_REGION || 'unknown',
        url: process.env.VERCEL_URL || 'unknown'
      },
      emailConfig: {
        user: process.env.EMAIL_USER ? '✅ Configurado' : '❌ Não encontrado',
        pass: process.env.EMAIL_PASS ? '✅ Configurado' : '❌ Não encontrado'
      },
      headers: {
        origin: req.headers.origin || 'No origin header',
        userAgent: req.headers['user-agent'] || 'No user-agent',
        host: req.headers.host || 'No host'
      }
    };

    console.log('Teste endpoint chamado:', {
      method: req.method,
      origin: req.headers.origin,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Erro no endpoint de teste:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Erro interno no endpoint de teste',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};