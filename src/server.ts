import Fastify from 'fastify';
import bcrypt from 'bcrypt';

const app = Fastify();

// Rota de teste
app.get('/', async () => {
  return { message: 'Servidor rodando 🚀' };
});

// Exemplo: hashing de senha
app.post('/hash', async (req, reply) => {
  const { senha } = req.body as { senha: string };
  const hash = await bcrypt.hash(senha, 10);
  return { hash };
});

// Exemplo: verificar senha
app.post('/verify', async (req, reply) => {
  const { senha, hash } = req.body as { senha: string; hash: string };
  const match = await bcrypt.compare(senha, hash);
    return { valid: match };
});

// Inicializa o servidor
app.listen({ port: 3000 })
  .then(() => console.log('🔥 Servidor rodando em http://localhost:3000'))
  .catch(console.error);
