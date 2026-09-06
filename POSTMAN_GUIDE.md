# Guia: Testando a API com Postman

## 📥 Como Importar a Coleção no Postman

### Passo 1: Abrir Postman
- Abra o aplicativo Postman (ou acesse https://web.postman.co)

### Passo 2: Importar a Coleção
1. Clique no botão **Import** (canto superior esquerdo)
2. Selecione a opção **Upload Files**
3. Navegue até o arquivo `postman-collection.json` deste repositório
4. Clique em **Open** ou apenas arraste o arquivo para o Postman
5. Clique em **Import**

### Passo 3: Verificar Variável de Ambiente
- A coleção já vem com a variável `base_url` configurada como `http://localhost:3333`
- Se sua API está rodando em outro endereço, altere a variável:
  1. Clique nas configurações da coleção (ícone de três pontos)
  2. Acesse a aba **Variables**
  3. Altere `base_url` conforme necessário

## 🚀 Requisições Disponíveis

### 1️⃣ GET / - Status da API
```
GET http://localhost:3333/
```
**Descrição**: Verifica se a API está funcionando

**Resposta esperada**:
```json
{
  "status": "ok",
  "message": "API Catálogo de Produtos funcionando!"
}
```

---

### 2️⃣ GET /products - Listar Todos os Produtos
```
GET http://localhost:3333/products
```
**Descrição**: Retorna uma lista com todos os produtos

**Resposta esperada**:
```json
[
  {
    "id": 1,
    "title": "Notebook Dell Inspiron 15",
    "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB.",
    "price": "3499.9",
    "createdAt": "2026-09-05T17:52:25.780Z",
    "updatedAt": "2026-09-05T17:52:25.780Z"
  },
  ...
]
```

---

### 3️⃣ GET /products/:id - Buscar Produto por ID
```
GET http://localhost:3333/products/1
```
**Descrição**: Retorna um produto específico (altere o ID conforme necessário)

**Resposta esperada (sucesso - 200)**:
```json
{
  "id": 1,
  "title": "Notebook Dell Inspiron 15",
  "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB.",
  "price": "3499.9",
  "createdAt": "2026-09-05T17:52:25.780Z",
  "updatedAt": "2026-09-05T17:52:25.780Z"
}
```

**Resposta esperada (não encontrado - 404)**:
```json
{
  "error": "Produto não encontrado"
}
```

---

### 4️⃣ POST /products - Criar Novo Produto
```
POST http://localhost:3333/products
Content-Type: application/json
```

**Corpo da requisição**:
```json
{
  "title": "Headset Logitech G Pro X",
  "description": "Headset gamer wireless com som surround 7.1",
  "price": 699.90
}
```

**Resposta esperada (201 - Criado)**:
```json
{
  "id": 6,
  "title": "Headset Logitech G Pro X",
  "description": "Headset gamer wireless com som surround 7.1",
  "price": "699.9",
  "createdAt": "2026-09-06T18:10:00.000Z",
  "updatedAt": "2026-09-06T18:10:00.000Z"
}
```

---

### 5️⃣ PUT /products/:id - Atualizar Produto
```
PUT http://localhost:3333/products/1
Content-Type: application/json
```

**Corpo da requisição**:
```json
{
  "title": "Notebook Dell Inspiron 15 - Atualizado",
  "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB - Versão 2026",
  "price": 3599.90
}
```

**Resposta esperada (200)**:
```json
{
  "id": 1,
  "title": "Notebook Dell Inspiron 15 - Atualizado",
  "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB - Versão 2026",
  "price": "3599.9",
  "createdAt": "2026-09-05T17:52:25.780Z",
  "updatedAt": "2026-09-06T18:10:00.000Z"
}
```

---

### 6️⃣ DELETE /products/:id - Deletar Produto
```
DELETE http://localhost:3333/products/1
```

**Resposta esperada (200)**:
```json
{
  "message": "Produto excluído com sucesso",
  "product": {
    "id": 1,
    "title": "Notebook Dell Inspiron 15 - Atualizado",
    "description": "Notebook Dell com processador Intel Core i5, 8 GB de RAM e SSD de 512 GB - Versão 2026",
    "price": "3599.9",
    "createdAt": "2026-09-05T17:52:25.780Z",
    "updatedAt": "2026-09-06T18:10:00.000Z"
  }
}
```

---

## 💡 Dicas Úteis

### Usar Variáveis no Postman
- Use `{{base_url}}` nas URLs para referenciar a variável de ambiente
- Exemplo: `{{base_url}}/products/1`

### Testar Sequências
1. Execute `GET /products` para ver todos os produtos
2. Pegue um ID da resposta
3. Execute `GET /products/:id` com esse ID
4. Crie um novo com `POST /products`
5. Atualize com `PUT /products/:id`
6. Delete com `DELETE /products/:id`

### Visualizar Respostas Formatadas
- No Postman, selecione a aba **Pretty** na resposta para ver JSON formatado
- Use a aba **Headers** para ver headers da resposta

### Salvar Respostas
- Clique em **Save Response** para salvar a resposta para posterior visualização

---

## ⚙️ Pré-requisitos para Testes

1. **API rodando**:
   ```bash
   npm run dev
   ```

2. **Banco de dados com Docker**:
   ```bash
   docker-compose up -d
   ```

3. **Dados populados**:
   ```bash
   npm run seed
   ```

---

## 📊 Estrutura de Testes Recomendada

Para a entrega, execute nesta ordem:

1. ✅ **GET /** → Verificar status
2. ✅ **GET /products** → Listar todos (screenshots para o vídeo)
3. ✅ **GET /products/1** → Buscar específico (com ID válido)
4. ✅ Opcionais: **POST**, **PUT**, **DELETE** (para demonstrar total)

---

Pronto! Você agora pode testar toda a API com Postman! 🚀
