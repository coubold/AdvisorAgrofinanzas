// ═══════════════════════════════════════════════════════
// CATÁLOGO BBVA — 57 merchants, 166 sub-productos
// Fuente: API /openmarket/servicios/agro/convenios
// Fecha: marzo 2026
// ═══════════════════════════════════════════════════════
const CATALOG = [
  {
    "id": 1,
    "nombre": "INDUSTRIAS COMOFRA S.R.L.",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 2.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 27.5,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 2.25,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 2,
    "nombre": "LARTIRIGOYEN Y CIA SA",
    "cat": "semillas",
    "subcat": "semillas_certificadas",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": false,
    "tnaMin": 3.9,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.75,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.9,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 4,
    "nombre": "SYNGENTA AGRO S.A.",
    "cat": "semillas",
    "subcat": "semillas_certificadas",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 10.42,
        "subsidio": 6,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 23.15,
        "subsidio": 6,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 27.41,
        "subsidio": 6,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 29.55,
        "subsidio": 6,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 5,
    "nombre": "ADAMA ARGENTINA SA",
    "cat": "proteccion_cultivos",
    "subcat": "herbicidas_fungicidas",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "desarrollo",
      "proteccion"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 11,
    "nombre": "FERCAM",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 22,
        "subsidio": 20,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 12,
    "nombre": "GIORGI SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 27.5,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 13,
    "nombre": "PIERSANTI",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 14,
    "nombre": "PAUNY",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 15,
    "nombre": "CRUCIANELLI",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 18,
        "subsidio": 25,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 16,
    "nombre": "FERTEC",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 18,
        "subsidio": 25,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 17,
    "nombre": "BBVA SITE",
    "cat": "financiamiento",
    "subcat": "prestamo_campana",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "desarrollo",
      "proteccion",
      "cosecha",
      "poscosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.5,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.5,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.5,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0.21,
        "subsidio": 4.5,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 18,
    "nombre": "STARA ARGENTINA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 19,
    "nombre": "RICARDO VENTURINO",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 20,
    "nombre": "CNH ARGENTINA SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 4.75,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 4.75,
        "subsidio": 7,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 21,
    "nombre": "AGCO ARGENTINA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 2.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 27.5,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 2.25,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 22,
    "nombre": "ZAFRA SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 23,
    "nombre": "SALA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 24,
    "nombre": "RATTO HERMANOS",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 25,
    "nombre": "REMONDA CASTRO",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 26,
    "nombre": "CHAYE HNOS SRL",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 27,
    "nombre": "IND. METALÚRGICAS CESTARI",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 2.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 2.25,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 28,
    "nombre": "AGRONORTE",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 29,
    "nombre": "DIESEL LANGE SRL",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 30,
    "nombre": "AGROINDUSTRIA Y SERVICIOS",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 31,
    "nombre": "AGROMETAL",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 32,
    "nombre": "CONCI SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 33,
    "nombre": "BUFALO SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 34,
    "nombre": "BERGER SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 35,
    "nombre": "AKRON SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 18,
        "subsidio": 25,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 36,
    "nombre": "KUBOTA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 18,
        "subsidio": 25,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 37,
    "nombre": "PRABA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 38,
    "nombre": "PIEROBON SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 2.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 27.5,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 2.25,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 39,
    "nombre": "VALMONT",
    "cat": "maquinaria",
    "subcat": "riego",
    "ars": true,
    "usd": false,
    "tna0": false,
    "sub": true,
    "tnaMin": 29,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 40,
    "nombre": "ROLAND",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 41,
    "nombre": "ASCANELLI",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 42,
    "nombre": "AMERICAN AGRO SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 43,
    "nombre": "TEKRON",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 18,
        "subsidio": 25,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 44,
    "nombre": "TANZI SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 45,
    "nombre": "MAIZCO",
    "cat": "maquinaria",
    "subcat": "cabezales_cosecha",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 46,
    "nombre": "PLANTIUM SA",
    "cat": "maquinaria",
    "subcat": "pulverizacion",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 47,
    "nombre": "GEOSISTEMAS SRL",
    "cat": "maquinaria",
    "subcat": "tecnologia_precision",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 48,
    "nombre": "DYE SA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 49,
    "nombre": "IRRI AR SA",
    "cat": "maquinaria",
    "subcat": "riego",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 50,
    "nombre": "MAINERO",
    "cat": "maquinaria",
    "subcat": "cabezales_cosecha",
    "ars": true,
    "usd": false,
    "tna0": false,
    "sub": true,
    "tnaMin": 25.5,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 51,
    "nombre": "ALBERTO GAUSS E HIJOS",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 52,
    "nombre": "BERTINI",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 53,
    "nombre": "MULTIJACTO",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 54,
    "nombre": "KUHN",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 3.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 29,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 3.25,
        "subsidio": 10,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 55,
    "nombre": "METALFOR",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 2.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 27.5,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 2.25,
        "subsidio": 12,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 56,
    "nombre": "PARRA",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 57,
    "nombre": "SARTOR",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": true,
    "tnaMin": 5.25,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 32,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 5.25,
        "subsidio": 6,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 58,
    "nombre": "MONTECOR",
    "cat": "maquinaria",
    "subcat": "maquinaria_agricola",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "cosecha"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 25.5,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 15,
        "plazo": "4 años",
        "dias": 1460,
        "am": "Alemán"
      }
    ]
  },
  {
    "id": 59,
    "nombre": "TOMAS HNOS Y CIA SA",
    "cat": "semillas",
    "subcat": "semillas_certificadas",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": false,
    "tnaMin": 3.9,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.75,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.9,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 60,
    "nombre": "FEDEA SA",
    "cat": "semillas",
    "subcat": "semillas_certificadas",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": false,
    "tnaMin": 3.9,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.75,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.9,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 61,
    "nombre": "GUAZZARONI GRECO SA",
    "cat": "semillas",
    "subcat": "semillas_certificadas",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 27.59,
        "subsidio": 2,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 31.79,
        "subsidio": 2,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 33.19,
        "subsidio": 2,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 33.89,
        "subsidio": 2,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 1,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 1.86,
        "subsidio": 1,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.38,
        "subsidio": 1,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.88,
        "subsidio": 1,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 62,
    "nombre": "STOLLER ARGENTINA S.A.",
    "cat": "proteccion_cultivos",
    "subcat": "nutricion_bioestimulantes",
    "ars": true,
    "usd": true,
    "tna0": false,
    "sub": false,
    "tnaMin": 3.9,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "desarrollo",
      "proteccion"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 3.9,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.75,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 4.9,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  },
  {
    "id": 63,
    "nombre": "ATANOR SCA",
    "cat": "fertilizantes",
    "subcat": "nitrogeno",
    "ars": true,
    "usd": true,
    "tna0": true,
    "sub": true,
    "tnaMin": 0,
    "cultivos": [
      "maiz",
      "soja",
      "trigo",
      "girasol"
    ],
    "etapas": [
      "pre_siembra",
      "siembra",
      "desarrollo"
    ],
    "subs": [
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "ARS",
        "tna": 36,
        "subsidio": 0,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "90 días",
        "dias": 90,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "180 días",
        "dias": 180,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "270 días",
        "dias": 270,
        "am": "Bullet"
      },
      {
        "mon": "USD",
        "tna": 0,
        "subsidio": 4.9,
        "plazo": "360 días",
        "dias": 360,
        "am": "Bullet"
      }
    ]
  }
];
