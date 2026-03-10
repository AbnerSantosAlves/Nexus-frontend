# SATEP Frontend

## Descrição

O SATEP (Sistema de Agendamento de Transporte para Pacientes) é um sistema desenvolvido com o objetivo de otimizar o processo de solicitação, agendamento e confirmação do transporte de pacientes oferecido pela prefeitura.

Este repositório contém a aplicação frontend do sistema, responsável pela interface de interação com os usuários. A aplicação permite que pacientes realizem solicitações de transporte, acompanhem seus agendamentos e recebam confirmações de viagem de forma digital.

O projeto foi desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC), buscando propor uma solução tecnológica para substituir processos manuais atualmente utilizados na gestão desse serviço público.

## Objetivo

O objetivo do sistema é melhorar a organização e eficiência do agendamento de transporte para consultas médicas, reduzindo erros operacionais, atrasos e dificuldades enfrentadas por pacientes no processo atual.

A plataforma visa:

- Facilitar o cadastro e a solicitação de transporte por pacientes
- Permitir a visualização e gerenciamento de agendamentos
- Melhorar a comunicação entre pacientes e a administração do serviço
- Digitalizar processos atualmente realizados de forma manual

## Tecnologias Utilizadas

A aplicação foi desenvolvida utilizando tecnologias modernas de desenvolvimento web.

Principais tecnologias:

- React
- JavaScript
- HTML
- CSS
- Node Package Manager (npm)

Essas tecnologias permitem a construção de interfaces modernas, responsivas e escaláveis.

## Estrutura do Projeto

A estrutura do projeto segue a organização padrão de aplicações React.

```
satep-frontend
│
├── public
│   └── arquivos públicos da aplicação
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── package.json
└── README.md
```

- **public**: contém arquivos estáticos utilizados pela aplicação  
- **src**: contém todo o código-fonte da interface  
- **components**: componentes reutilizáveis da interface  
- **pages**: páginas principais da aplicação  
- **services**: comunicação com APIs ou serviços externos  
- **assets**: imagens, estilos e outros recursos  

## Instalação

Para executar o projeto localmente, é necessário possuir o Node.js instalado.

Clone o repositório:

```
git clone https://github.com/AbnerSantosAlves/satep-frontend.git
```

Acesse a pasta do projeto:

```
cd satep-frontend
```

Instale as dependências:

```
npm install
```

Execute a aplicação:

```
npm run dev
```

Após iniciar, a aplicação estará disponível em:

```
http://localhost:5173
```

## Funcionalidades

O sistema possui funcionalidades voltadas para a gestão de solicitações de transporte para pacientes.

Entre elas:

- Interface para solicitação de transporte
- Visualização de agendamentos
- Confirmação de viagens
- Interface responsiva para diferentes dispositivos
- Comunicação com serviços de backend

## Contexto do Projeto

O projeto foi idealizado a partir da observação das dificuldades enfrentadas por pacientes que dependem do transporte oferecido pela prefeitura para realizar consultas médicas em outras cidades.

Atualmente, muitos desses processos são realizados manualmente, o que pode gerar falhas de comunicação, atrasos e dificuldades no acompanhamento das solicitações.

A proposta do SATEP é oferecer uma solução digital para tornar esse processo mais eficiente, acessível e organizado.

## Autor

Abner Santos Alves

Estudante de Análise e Desenvolvimento de Sistemas.
