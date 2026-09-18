# Product Management API (Express + Prisma + Zod)

API RESTful completa desenvolvida em Node.js e TypeScript para gerenciamento de produtos com validação de dados em tempo de execução e banco de dados PostgreSQL via Docker.

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
* Docker e Docker Compose instalados.
* Node.js (v18+) instalado.

### 2. Passo a Passo
```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Suba o banco de dados PostgreSQL
docker-compose up -d

# Execute as migrações do banco de dados
npm run prisma:migrate

# Popule o banco com dados iniciais (Seed)
npm run seed

# Inicie o servidor de desenvolvimento
npm run dev