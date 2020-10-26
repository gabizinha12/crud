# CRUD Softwrap
## Sobre o projeto
- No FrontEnd usei componentes funcionais como atestado no teste: 
- Hooks
-  MaterialUI
- eslint
- variáveis em inglês
- É possível registrar, editar e deletar usuários
# Para as requisições:
- Foi usada a biblioteca Axios 

Save(POST)
É possível salvar uma quantidade ilimitada de usuários, a paginação vai até a 10.
List(GET)
A paginação funciona passando a página pela query da URL, sendo dinamicamente puxada pelo FrontEnd em React.
Edit(PUT)
O usuário consegue editar normalmente os registros
Exclude(DELETE)
Ao clicar no botão o usuário consegue excluir o registro, e no final é retornada uma mensagem de erro ou sucesso.
# Deploy
O banco de dados está no serviço de cloud MongoDB Atlas (https://www.mongodb.com/cloud/atlas), o Front no Netlify com CI/CD (https://thirsty-perlman-6ec93d.netlify.app/), a API está hospedada no Azure no seguinte endereço:
(https://api-rest-node.azurewebsites.net/) com CI/CD também.



