# Retro FC ⚽👕

Projeto acadêmico de desenvolvimento web construído com Vue.js 3. Trata-se de uma aplicação front-end que consome uma API REST mockada (JSON Server), responsável por simular o fluxo de escolha, personalização e gestão de encomendas de uma loja de camisas de futebol antigas.

### Links

* **Produção (Vercel):** [Acessar Loja Retro FC](https://retro-fc.vercel.app/)
* **API Pública (Render):** [Acessar JSON Server](https://api-retro-fc.onrender.com)
* **Repositório (GitHub):** [Acessar Código-Fonte](https://github.com/gabxnz/dev-web-turma-b/tree/main/Gabriel%20Costa/Projeto%20final)

---

## Visão Geral

A base estrutural do sistema original (focado em uma hamburgueria) foi integralmente refatorada para dar origem à **Retro FC**, um e-commerce voltado para o vestuário esportivo clássico.

**Alterações Estruturais e de Back-end**
O banco de dados (`db.json`) foi remodelado para suportar os novos produtos. Chaves legadas como "hamburgueres" e "pontos da carne" foram substituídas por opções de "camisas", "modelos/cortes" e listas de "personalizações" (como adição de patches ou numeração). Além disso, todo o roteamento do sistema foi atualizado para consumir a URL da API em produção dinamicamente, através da variável de ambiente `VUE_APP_API_BASE_URL`.

**Identidade e Comunicação Visual**
Toda a interface, textos institucionais e nomenclaturas do sistema foram adaptados para refletir a temática de futebol. As tabelas de gerenciamento foram ajustadas para que os administradores identifiquem os pedidos pelo nome da camisa e pelo tipo de modelo selecionado, substituindo os elementos antigos do layout.

---

## Solução Técnica: Validações e Alertas

Para garantir a integridade dos dados e atender aos requisitos de Experiência do Usuário (UX), foi implementado um sistema de feedback visual imediato baseado em alertas semânticos.

A lógica de comunicação com o usuário foi estruturada no Vue 3 através dos seguintes pilares:

* **Validação Estrita:** No momento de fechar a encomenda, o método de envio intercepta a requisição. Se campos essenciais, como o Nome do Cliente ou a seleção da Camisa, não forem preenchidos, a aplicação bloqueia o envio (POST) e exibe um alerta de aviso/erro.
* **Feedback Semântico:** As mensagens em tela utilizam classes CSS dinâmicas para sinalizar o contexto da ação. O sistema utiliza cores específicas: **Verde** para ações concluídas com sucesso (cadastro, alteração de status ou remoção de encomendas) e **Vermelho/Laranja** para dados faltantes.
* **Fluxo Contínuo (Redirecionamento Inteligente):** O sistema utiliza a reatividade do Vue atrelada a temporizadores (`setTimeout`). Após a criação bem-sucedida de um pedido, o alerta de sucesso é exibido e a aplicação redireciona o usuário para o painel de listagem, que já é carregado com os dados atualizados em tempo real.

**Exemplo da Lógica de Validação:**

```javascript
async realizarPedido(e) {
  e.preventDefault();

  if (!this.nomeCliente || !this.camisaId) {
    this.mensagem = "O nome do cliente e a escolha da camisa são obrigatórios!";
    this.tipoAlerta = "erro";
    return;
  }

  this.mensagem = "Encomenda realizada com sucesso!";
  this.tipoAlerta = "sucesso";

  setTimeout(() => {
    this.mensagem = "";
    this.$router.push('/pedidos');
  }, 3000);
}