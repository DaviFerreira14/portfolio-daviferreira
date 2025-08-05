// Domínios permitidos
const allowedOrigins = [
  'https://portfolio-daviferreira.vercel.app',
  'https://portfolio-davi-ferreira.vercel.app',
  'http://localhost:4200',
  'http://localhost:3000'
];

module.exports = async (req, res) => {
  // Configuração de CORS
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Responder a requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Apenas aceitar requisições GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método não permitido' 
    });
  }
  
  res.json({ 
    success: true,
    message: 'Backend funcionando!',
    timestamp: new Date().toISOString(),
    cors: 'Configurado corretamente',
    allowedOrigins: allowedOrigins,
    environment: process.env.NODE_ENV || 'development'
  });
}; 