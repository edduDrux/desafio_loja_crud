# LojaCrud

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) na versão 19.1.5.

## Sobre o Projeto

O LojaCrud é uma aplicação Angular que permite gerenciar produtos em uma loja virtual. A aplicação oferece funcionalidades básicas de CRUD (Create, Read, Update, Delete) para adicionar, visualizar, editar e excluir produtos. O projeto foi desenvolvido com foco em boas práticas de desenvolvimento, como modularização, componentização e uso de serviços.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js (versão 16 ou superior)

Angular CLI (instalado globalmente via npm install -g @angular/cli)

Um navegador moderno (Chrome, Firefox, Edge, etc.)

## Como Executar o Projeto

### Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute o seguinte comando:

```bash
ng serve
```

Após iniciar o servidor, abra seu navegador e acesse http://localhost:4200/. A aplicação será recarregada automaticamente sempre que você modificar qualquer arquivo de código.

## Descrição das Rotas

/login: Rota para a página de login. Exibe o componente LoginComponent.

/: Rota principal da aplicação. Exibe a lista de produtos (ProductListComponent) e é protegida pelo AuthGuard (somente usuários autenticados podem acessar).

/product/edit/:id: Rota para editar um produto existente. Exibe o formulário de produto (ProductFormComponent) e também é protegida pelo AuthGuard.

/product/add: Rota para adicionar um novo produto. Exibe o formulário de produto (ProductFormComponent) e é protegida pelo AuthGuard.

## Recursos Adicionais

Para mais informações sobre o Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
