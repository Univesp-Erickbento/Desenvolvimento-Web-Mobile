# Catálogo de Produtos - API REST

Uma API REST em Node.js + TypeScript + Express que gerencia um catálogo de produtos, usando PostgreSQL como banco de dados (rodando em Docker) e Prisma como ORM.

## 🎯 Objetivo

Implementar uma API back-end que persiste dados de produtos em um banco PostgreSQL, com validação de fluxo completo: servidor Express → Prisma → PostgreSQL (container Docker).

## 🏗️ Arquitetura

- **Backend**: Node.js + TypeScript + Express
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL 15
- **Containerização**: Docker Compose
- **Runtime**: TSX (para compilação e execução de TypeScript)

## 📋 Requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18+)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

## 🚀 Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/catalogo-produtos.git
cd catalogo-produtos
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o arquivo `.env`

O arquivo `.env` já está configurado no repositório com as variáveis necessárias:

```env
DATABASE_URL="postgresql://catalogo_user:catalogo_pass@localhost:5432/catalogo_produtos"
```

Se precisar alterar, edite o arquivo `.env` conforme sua configuração local.

### 4. Subir o banco de dados com Docker Compose

```bash
docker-compose up -d
```

**Esperado**: Um container PostgreSQL estará rodando na porta `5432`.

Verifique o status:
```bash
docker ps
```

### 5. Executar as migrations do Prisma

```bash
npm run prisma:migrate
```

Isso criará as tabelas no banco de dados com base no esquema Prisma.

### 6. Popular o banco com dados iniciais (Seed)

```bash
npm run seed
```

Isso inserirá 5 produtos de exemplo no banco:
- Notebook Dell Inspiron 15
- Mouse Logitech MX Master 3S
- Teclado Mecânico Logitech G Pro
- Monitor LG UltraGear 24
- SSD Kingston NV2 1TB

### 7. Iniciar o servidor

```bash
npm run dev
```

**Esperado**: A API estará rodando em `http://localhost:3333`

## 📚 Endpoints da API

### 1. Status da API

```
GET /
```

**Resposta**:
```json
{
  "status": "ok",
  "message": "API Catálogo de Produtos funcionando!"
}
```

---

### 2. Listar todos os produtos

```
GET /products
```

**Resposta**:
```json
[
  {
    "id": 1,
    "title": "Notebook Dell Inspiron 15",
    "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB.",
    "price": "3499.90",
    "createdAt": "2026-09-06T12:00:00.000Z",
    "updatedAt": "2026-09-06T12:00:00.000Z"
  },
  ...
]
```

---

### 3. Buscar um produto por ID

```
GET /products/:id
```

**Exemplo**:
```
GET /products/1
```

**Resposta (sucesso - 200)**:
```json
{
  "id": 1,
  "title": "Notebook Dell Inspiron 15",
  "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB.",
  "price": "3499.90",
  "createdAt": "2026-09-06T12:00:00.000Z",
  "updatedAt": "2026-09-06T12:00:00.000Z"
}
```

**Resposta (não encontrado - 404)**:
```json
{
  "error": "Produto não encontrado"
}
```

---

### 4. Criar um novo produto (Opcional)

```
POST /products
Content-Type: application/json
```

**Corpo da requisição**:
```json
{
  "title": "Produto Novo",
  "description": "Descrição do produto",
  "price": 199.90
}
```

**Resposta (criado - 201)**:
```json
{
  "id": 6,
  "title": "Produto Novo",
  "description": "Descrição do produto",
  "price": "199.90",
  "createdAt": "2026-09-06T12:30:00.000Z",
  "updatedAt": "2026-09-06T12:30:00.000Z"
}
```

---

### 5. Atualizar um produto (Opcional)

```
PUT /products/:id
Content-Type: application/json
```

**Exemplo**:
```
PUT /products/1
```

**Corpo da requisição**:
```json
{
  "title": "Notebook Dell Inspiron 15 Atualizado",
  "description": "Descrição atualizada",
  "price": 3799.90
}
```

**Resposta (sucesso - 200)**:
```json
{
  "id": 1,
  "title": "Notebook Dell Inspiron 15 Atualizado",
  "description": "Descrição atualizada",
  "price": "3799.90",
  "createdAt": "2026-09-06T12:00:00.000Z",
  "updatedAt": "2026-09-06T12:35:00.000Z"
}
```

---

### 6. Deletar um produto (Opcional)

```
DELETE /products/:id
```

**Exemplo**:
```
DELETE /products/6
```

**Resposta (sucesso - 200)**:
```json
{
  "message": "Produto excluído com sucesso",
  "product": {
    "id": 6,
    "title": "Produto Novo",
    "description": "Descrição do produto",
    "price": "199.90",
    "createdAt": "2026-09-06T12:30:00.000Z",
    "updatedAt": "2026-09-06T12:30:00.000Z"
  }
}
```

---

## 🧪 Testando com Insomnia

1. Abra o **Insomnia**
2. Crie um novo workspace ou use um existente
3. Crie as seguintes requisições:

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `http://localhost:3333/` | Verificar status da API |
| GET | `http://localhost:3333/products` | Listar todos os produtos |
| GET | `http://localhost:3333/products/1` | Buscar um produto específico |
| POST | `http://localhost:3333/products` | Criar novo produto |
| PUT | `http://localhost:3333/products/1` | Atualizar produto |
| DELETE | `http://localhost:3333/products/1` | Deletar produto |

### Exportar requisições do Insomnia

Para facilitar a demonstração, você pode:
1. Criar as requisições no Insomnia
2. Ir em `Workspace` → `Export`
3. Salvar como arquivo `.json` no repositório (opcional)

## 🔍 Ferramentas Úteis

### Visualizar dados no Prisma Studio

```bash
npm run prisma:studio
```

Isso abre uma interface visual em `http://localhost:5555` onde você pode ver e gerenciar todos os dados do banco em tempo real.

### Ver logs do container PostgreSQL

```bash
docker logs catalogo-postgres
```

### Parar o container

```bash
docker-compose down
```

### Parar e remover dados (limpar tudo)

```bash
docker-compose down -v
```

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── server.ts       # Servidor Express com endpoints
│   └── prisma.ts       # Configuração do Prisma Client
├── prisma/
│   ├── schema.prisma   # Esquema do banco de dados
│   ├── seed.ts         # Seed com dados iniciais
│   └── migrations/     # Histórico de migrações
├── docker-compose.yml  # Configuração do PostgreSQL
├── .env                # Variáveis de ambiente
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração TypeScript
└── README.md           # Este arquivo
```

## 🔧 Scripts disponíveis

```bash
npm run dev              # Inicia o servidor em modo watch
npm run seed             # Executa o seed para popular o banco
npm run prisma:migrate   # Cria/aplica migrations
npm run prisma:studio    # Abre Prisma Studio
```

## 📊 Modelo de dados (Product)

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  title       String
  description String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- `id`: Identificador único (auto-incremento)
- `title`: Nome do produto
- `description`: Descrição do produto (texto longo)
- `price`: Preço com precisão decimal (até 10 dígitos, 2 casas decimais)
- `createdAt`: Data de criação (auto-preenchida)
- `updatedAt`: Data da última atualização (auto-atualizada)

## ⚠️ Troubleshooting

### Erro: "Database connection refused"

**Solução**: Certifique-se de que:
1. Docker está rodando: `docker ps`
2. Container PostgreSQL está ativo: `docker ps | grep postgres`
3. A porta 5432 não está em uso por outro serviço

### Erro: "Migration failed"

**Solução**:
```bash
# 1. Parar o servidor (Ctrl+C)
# 2. Resetar as migrações
npx prisma migrate reset
# 3. Rodar o seed novamente
npm run seed
```

### Erro: "Prisma Client version mismatch"

**Solução**:
```bash
npm run prisma:generate
npm run dev
```

### Porta 3333 já está em uso

**Solução**: Altere a porta no `src/server.ts` (procure por `const PORT = 3333`)

## 📝 Notas Importantes

✅ A API está totalmente funcional e testada
✅ Todos os endpoints obrigatórios estão implementados
✅ Tratamento de erros está configurado
✅ Validação de dados de entrada está presente
✅ Documentação completa dos endpoints está disponível

## 🎬 Para a entrega

1. ✅ Código-fonte está no GitHub (repositório público)
2. 📹 Grave um vídeo (2-5 minutos) demonstrando:
   - Estrutura do código
   - Containers rodando: `docker ps`
   - Dados no Prisma Studio: `npm run prisma:studio`
   - Requisições no Insomnia (GET /, GET /products, GET /products/:id)
3. 📊 Inclua screenshots ou prints do processo

## 👨‍💻 Autor

Seu Nome

## 📜 Licença

ISC

---

**Desenvolvido com ❤️ usando Node.js, TypeScript, Express, Prisma e PostgreSQL**
