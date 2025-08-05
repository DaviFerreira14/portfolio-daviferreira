const https = require('https');

// Teste de CORS
const testCORS = () => {
  const options = {
    hostname: 'portfolio-davi-ferreira-backend.vercel.app',
    port: 443,
    path: '/api/test',
    method: 'GET',
    headers: {
      'Origin': 'https://portfolio-daviferreira.vercel.app',
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
    });
  });

  req.on('error', (e) => {
    console.error('Error:', e);
  });

  req.end();
};

console.log('Testando configuração de CORS...');
testCORS(); 