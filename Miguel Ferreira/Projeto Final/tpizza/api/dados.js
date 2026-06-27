const dados = {
  "tipos_pontos": [
    { "id": 1, "descricao": "Tradicional" },
    { "id": 2, "descricao": "Fina" },
    { "id": 3, "descricao": "Recheada" },
    { "id": 4, "descricao": "Integral" }
  ],
  "status_pedido": [
    { "id": 1, "descricao": "Pedido em espera" },
    { "id": 2, "descricao": "Em preparo" },
    { "id": 3, "descricao": "Saiu para entrega" },
    { "id": 4, "descricao": "Entregue" },
    { "id": 5, "descricao": "Pedido pendente" },
    { "id": 6, "descricao": "Pedido confirmado" }
  ],
  "pedidos": [],
  "opcionais": {
    "complemento": [
      { "id": 1, "nome": "Borda Recheada", "descricao": "Catupiry cremoso", "foto": "", "valor": 10, "eh_novidade": true },
      { "id": 2, "nome": "Cheddar Extra", "descricao": "Adicione cheddar na borda", "foto": "", "valor": 8, "eh_novidade": false },
      { "id": 3, "nome": "Catupiry Extra", "descricao": "Mais Catupiry", "foto": "", "valor": 8, "eh_novidade": false }
    ],
    "bebidas": [
      { "id": 1, "nome": "Coca-Cola Lata 350ml", "descricao": "", "foto": "", "valor": 7, "eh_novidade": false },
      { "id": 2, "nome": "Guaraná Antarctica 350ml", "descricao": "", "foto": "", "valor": 7, "eh_novidade": false },
      { "id": 3, "nome": "Água Mineral", "descricao": "", "foto": "", "valor": 4, "eh_novidade": false },
      { "id": 4, "nome": "Suco Natural", "descricao": "", "foto": "", "valor": 9, "eh_novidade": false }
    ]
  },
  "menu": {
    "limitado": [
      {
        "id": 1,
        "nome": "Pizza Especial da Casa",
        "foto": "/img/Especial-da-Casa.jpg",
        "descricao": "Molho especial, mussarela, pepperoni, parmesão e manjericão.",
        "valor": 65,
        "eh_novidade": true
      }
    ],
    "burgues": [
      {
        "id": 1,
        "nome": "Pizza Calabresa",
        "foto": "/img/Calabresa.jpg",
        "descricao": "Molho de tomate, mussarela, calabresa, cebola e orégano.",
        "valor": 49,
        "eh_novidade": true
      },
      {
        "id": 2,
        "nome": "Pizza Portuguesa",
        "foto": "/img/Portuguesa.png",
        "descricao": "Presunto, ovos, cebola, ervilha, mussarela e orégano.",
        "valor": 55,
        "eh_novidade": true
      },
      {
        "id": 3,
        "nome": "Pizza Margherita",
        "foto": "/img/Margherita.jpg",
        "descricao": "Molho de tomate, mussarela, tomate, manjericão e azeite.",
        "valor": 48,
        "eh_novidade": false
      },
      {
        "id": 4,
        "nome": "Pizza Frango com Catupiry",
        "foto": "/img/Frango-com-Catupiry.jpg",
        "descricao": "Frango desfiado, Catupiry, mussarela e orégano.",
        "valor": 58,
        "eh_novidade": true
      },
      {
        "id": 5,
        "nome": "Pizza Quatro Queijos",
        "foto": "/img/Quatro-Queijos.jpg",
        "descricao": "Mussarela, parmesão, provolone, gorgonzola e orégano.",
        "valor": 60,
        "eh_novidade": true
      },
      {
        "id": 6,
        "nome": "Pizza Pepperoni",
        "foto": "/img/Pepperoni.jpg",
        "descricao": "Molho de tomate, mussarela, pepperoni e parmesão.",
        "valor": 59,
        "eh_novidade": false
      },
      {
        "id": 7,
        "nome": "Pizza Vegetariana",
        "foto": "/img/Vegetariana.jpg",
        "descricao": "Brócolis, tomate, milho, cebola roxa, azeitonas e mussarela.",
        "valor": 54,
        "eh_novidade": false
      }
    ]
  }
};

export default function handler(req, res) {
  const { recurso, id } = req.query;

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!recurso) {
    return res.status(200).json(dados);
  }

  if (!dados[recurso]) {
    return res.status(404).json({ erro: "Recurso não encontrado" });
  }

  if (req.method === "GET") {
    return res.status(200).json(dados[recurso]);
  }

  if (req.method === "POST" && recurso === "pedidos") {
    const novoPedido = {
      ...req.body,
      id: Date.now()
    };

    dados.pedidos.push(novoPedido);

    return res.status(201).json(novoPedido);
  }

  if (req.method === "PATCH" && recurso === "pedidos") {
    const pedido = dados.pedidos.find((item) => String(item.id) === String(id));

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    Object.assign(pedido, req.body);

    return res.status(200).json(pedido);
  }

  if (req.method === "DELETE" && recurso === "pedidos") {
    dados.pedidos = dados.pedidos.filter((item) => String(item.id) !== String(id));

    return res.status(200).json({ mensagem: "Pedido removido com sucesso" });
  }

  return res.status(405).json({ erro: "Método não permitido" });
}