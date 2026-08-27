const products = [
  {
    id: 11,
    name: "Blusa Moletom 2 Cabos",
    description:
      "Blusa de moletom feminina em tom off-white, com capuz, dois cabos contrastantes e bordado exclusivo diDios. O tecido encorpado e macio oferece conforto térmico, enquanto a modelagem ampla garante um caimento moderno e versátil para o dia a dia.",
    category: "Moletons",
    price: 169.99,
    oldPrice: 199.99,
    installments: 5,
    stock: 10,
    badge: "Lançamento",
    image: "/images/moletom-2-cabos-frente.png",
    images: [
      "/images/moletom-2-cabos-frente.png",
      "/images/moletom-2-cabos-lateral.png",
      "/images/moletom-2-cabos-pose.png"
    ],
    colors: ["Off-white"],
    sizes: ["P", "M", "G", "GG"]
  },

  {
    id: 9,
    name: "Camiseta Feminina Essential Cacau",
    description:
      "Camiseta feminina premium em tom cacau, com modelagem casual, toque macio e caimento confortável. Uma peça versátil e sofisticada para compor produções elegantes no dia a dia.",
    category: "Camisetas",
    price: 89.90,
    oldPrice: 119.90,
    installments: 3,
    stock: 12,
    badge: "Lançamento",
    image: "/images/camiseta-feminina-cacau.jpeg",
    images: ["/images/camiseta-feminina-cacau.jpeg"],
    colors: ["Cacau"],
    sizes: ["P", "M", "G", "GG"]
  },

  {
    id: 10,
    name: "Camiseta Feminina Essential Marinho",
    description:
      "Camiseta feminina premium em azul-marinho, desenvolvida para oferecer conforto e um visual contemporâneo. A modelagem casual proporciona ótimo caimento e combina facilmente com jeans, alfaiataria ou peças esportivas.",
    category: "Camisetas",
    price: 89.90,
    oldPrice: 119.90,
    installments: 3,
    stock: 12,
    badge: "Lançamento",
    image: "/images/camiseta-feminina-marinho.jpeg",
    images: ["/images/camiseta-feminina-marinho.jpeg"],
    colors: ["Azul-marinho"],
    sizes: ["P", "M", "G", "GG"]
  },

  {
    id: 1,
    name: "Camiseta Essential Black",
    description:
      "Camiseta premium confeccionada em algodão 100%, confortável e ideal para qualquer ocasião.",

    category: "Camisetas",

    price: 129.90,

    oldPrice: 179.90,

    installments: 6,

    stock: 18,

    badge: "Novo",

    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900",

    colors: [
      "Preto",
      "Branco",
      "Cinza"
    ],

    sizes: [
      "P",
      "M",
      "G",
      "GG"
    ]
  },

  {
    id: 2,
    name: "Camiseta Basic White",
    description:
      "Modelo básico premium desenvolvido para uso diário.",

    category: "Camisetas",

    price: 99.90,

    oldPrice: 149.90,

    installments: 6,

    stock: 14,

    badge: "Promoção",

    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723?w=900",

    colors: [
      "Branco",
      "Preto"
    ],

    sizes: [
      "P",
      "M",
      "G",
      "GG"
    ]
  },

  {
    id: 3,
    name: "Jaqueta Premium",
    description:
      "Jaqueta moderna com acabamento premium.",

    category: "Jaquetas",

    price: 349.90,

    oldPrice: 449.90,

    installments: 10,

    stock: 7,

    badge: "Mais Vendido",

    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900",

    colors: [
      "Preto"
    ],

    sizes: [
      "M",
      "G",
      "GG"
    ]
  },

  {
    id: 4,
    name: "Calça Slim Fit",
    description:
      "Calça slim confortável para o dia a dia.",

    category: "Calças",

    price: 219.90,

    oldPrice: 289.90,

    installments: 8,

    stock: 11,

    badge: "Novo",

    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900",

    colors: [
      "Azul",
      "Preto"
    ],

    sizes: [
      "38",
      "40",
      "42",
      "44"
    ]
  },

  {
    id: 5,
    name: "Moletom Urban",
    description:
      "Moletom premium extremamente confortável.",

    category: "Moletons",

    price: 249.90,

    oldPrice: 319.90,

    installments: 8,

    stock: 10,

    badge: "Promoção",

    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900",

    colors: [
      "Cinza",
      "Preto"
    ],

    sizes: [
      "P",
      "M",
      "G",
      "GG"
    ]
  },

  {
    id: 6,
    name: "Tênis Casual",
    description:
      "Tênis casual para todas as ocasiões.",

    category: "Tênis",

    price: 399.90,

    oldPrice: 499.90,

    installments: 10,

    stock: 6,

    badge: "Novo",

    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",

    colors: [
      "Branco",
      "Preto"
    ],

    sizes: [
      "39",
      "40",
      "41",
      "42"
    ]
  },

  {
    id: 7,
    name: "Camisa Social Premium",
    description:
      "Camisa social elegante com excelente caimento.",

    category: "Camisas",

    price: 199.90,

    oldPrice: 269.90,

    installments: 6,

    stock: 9,

    badge: "Elegante",

    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900",

    colors: [
      "Branco",
      "Azul"
    ],

    sizes: [
      "P",
      "M",
      "G",
      "GG"
    ]
  },

  {
    id: 8,
    name: "Polo Classic",
    description:
      "Polo clássica confeccionada em tecido premium.",

    category: "Polos",

    price: 159.90,

    oldPrice: 219.90,

    installments: 6,

    stock: 20,

    badge: "Top",

    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=900",

    colors: [
      "Azul",
      "Branco"
    ],

    sizes: [
      "P",
      "M",
      "G",
      "GG"
    ]
  }
];

export default products;
