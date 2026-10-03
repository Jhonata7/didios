# Ddios — E-commerce em React

Aplicação de e-commerce desenvolvida com React, com navegação entre produtos, carrinho, checkout, favoritos, pedidos e integração de pagamento no back-end.

## Sobre o projeto

O objetivo do projeto é simular uma experiência completa de loja virtual, trabalhando organização de componentes, gerenciamento de estado, rotas, persistência de dados e integração entre front-end e servidor.

## Tecnologias

### Front-end

- React 19
- Vite 8
- React Router
- JavaScript
- Tailwind CSS
- Lucide React

### Back-end e integração

- Node.js
- Express
- Mercado Pago SDK
- CORS
- dotenv

## Funcionalidades

- Catálogo de produtos
- Página individual de produto
- Carrinho lateral
- Checkout
- Favoritos
- Área de pedidos
- Detalhes do pedido
- Página de sucesso
- Tela de login
- Persistência de informações no navegador
- Integração de pagamentos utilizando variável de ambiente no servidor
- Layout responsivo

## Rotas principais

```text
/
/produto/:id
/checkout
/success
/favoritos
/meus-pedidos
/pedido/:id
/login
```

## Executando localmente

Instale as dependências:

```bash
git clone https://github.com/Jhonata7/didios.git
cd didios
npm install
```

Inicie o front-end:

```bash
npm run dev
```

Inicie o servidor em outro terminal:

```bash
npm run server
```

Para utilizar a integração de pagamento, configure a variável de ambiente no servidor:

```env
MERCADO_PAGO_ACCESS_TOKEN=sua_credencial_aqui
```

Credenciais reais não devem ser versionadas no GitHub.

## Build

```bash
npm run build
```

---

Projeto desenvolvido e mantido por **Jhonata Milani** como parte do meu portfólio de desenvolvimento web e sistemas.
