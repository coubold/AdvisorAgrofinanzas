// CONSTANTES, LOOKUPS Y ESTADO GLOBAL
// ═══════════════════════════════════════════════════════
// CONSTANTES, LOOKUPS Y ESTADO GLOBAL
// ═══════════════════════════════════════════════════════

// Pesos del scoring engine
const W = {
  cultivo: 0.30,
  hist: 0.15,
  etapa: 0.25,
  tna: 0.12,
  subsidio: 0.08,
  especificidad: 0.10
};

// Calendario agronómico: mes → etapa por cultivo
const CAL = {
  maiz: {
    7:'pre_siembra', 8:'pre_siembra',
    9:'siembra', 10:'siembra',
    11:'desarrollo', 12:'desarrollo',
    1:'proteccion', 2:'proteccion',
    3:'cosecha', 4:'cosecha',
    5:'poscosecha', 6:'poscosecha'
  },
  soja: {
    7:'pre_siembra', 8:'pre_siembra', 9:'pre_siembra',
    10:'siembra', 11:'siembra',
    12:'desarrollo',
    1:'desarrollo', 2:'proteccion', 3:'proteccion',
    4:'cosecha', 5:'cosecha',
    6:'poscosecha'
  },
  trigo: {
    4:'pre_siembra',
    5:'siembra', 6:'siembra',
    7:'desarrollo', 8:'desarrollo',
    9:'proteccion', 10:'proteccion',
    11:'cosecha', 12:'cosecha',
    1:'poscosecha', 2:'poscosecha', 3:'poscosecha'
  },
  girasol: {
    7:'pre_siembra', 8:'pre_siembra',
    9:'siembra', 10:'siembra',
    11:'desarrollo', 12:'desarrollo',
    1:'proteccion',
    2:'cosecha', 3:'cosecha',
    4:'poscosecha', 5:'poscosecha', 6:'poscosecha'
  },
};

// Normalización de nombres API → interno
const CROP_MAP = {
  'no detectable': null,
  'maíz': 'maiz',
  'maiz': 'maiz',
  'corn': 'maiz',
  'soja': 'soja',
  'soy': 'soja',
  'trigo': 'trigo',
  'wheat': 'trigo',
  'girasol': 'girasol',
  'sunflower': 'girasol'
};

// Labels de display
const CROP_LABEL = { maiz: 'Maíz', soja: 'Soja', trigo: 'Trigo', girasol: 'Girasol' };
const CROP_EMOJI = { maiz: '🌽', soja: '🌱', trigo: '🌾', girasol: '🌻' };

const ETAPA_LABEL = {
  pre_siembra: 'Pre-siembra',
  siembra: 'Siembra',
  desarrollo: 'Desarrollo vegetativo',
  proteccion: 'Manejo y protección',
  cosecha: 'Cosecha',
  poscosecha: 'Poscosecha',
  general: 'Campaña'
};

const CAT_ICO = {
  maquinaria: '#E5EFF8:#004481',
  semillas: '#E2F5EC:#1B7A55',
  fertilizantes: '#FEF3DE:#B86B00',
  proteccion_cultivos: '#E0F5F5:#02A5A5',
  financiamiento: '#E5EFF8:#1473B7'
};

const CAT_LABEL = {
  maquinaria: 'Maquinaria',
  semillas: 'Semillas',
  fertilizantes: 'Fertilizantes',
  proteccion_cultivos: 'Protección de cultivos',
  financiamiento: 'Financiamiento'
};

const SUBCAT_LABEL = {
  maquinaria_agricola: 'Maquinaria agrícola',
  semillas_certificadas: 'Semillas certificadas',
  herbicidas_fungicidas: 'Herbicidas y fungicidas',
  nutricion_bioestimulantes: 'Nutrición y bioestimulantes',
  nitrogeno: 'Fertilizantes nitrogenados',
  prestamo_campana: 'Préstamo de campaña',
  riego: 'Sistemas de riego',
  tecnologia_precision: 'Tecnología de precisión',
  pulverizacion: 'Pulverización',
  cabezales_cosecha: 'Cabezales de cosecha'
};

// ── Contexto agronómico para explicaciones ──

const ETAPA_CONTEXT = {
  pre_siembra: 'El lote está en preparación para la siembra. Es el momento de asegurar semillas, fertilizantes de base y revisar maquinaria.',
  siembra: 'El lote se encuentra en período de siembra activa. La prioridad es semillas, inoculantes y fertilizantes de arranque.',
  desarrollo: 'El cultivo está en pleno crecimiento vegetativo. Las necesidades se concentran en fertilización nitrogenada y primeras aplicaciones fitosanitarias.',
  proteccion: 'El cultivo está en la fase más crítica de protección sanitaria. Fungicidas, insecticidas y bioestimulantes son prioritarios.',
  cosecha: 'El lote está próximo a cosecha. Las inversiones se orientan a maquinaria, logística y almacenamiento.',
  poscosecha: 'El cultivo fue cosechado. Momento ideal para planificar la próxima campaña y evaluar inversiones de capital.',
};

const CAT_CONTEXT = {
  proteccion_cultivos: {
    maiz: 'El maíz en esta etapa es susceptible a roya, tizón y cogollero. Un programa fitosanitario oportuno protege el rendimiento potencial del lote.',
    soja: 'La soja requiere control de mancha ojo de rana, roya asiática y chinches. La inversión en protección puede representar 3–5 qq/ha de diferencia.',
    trigo: 'El trigo en espigazón es crítico para fusariosis y roya. El timing de la aplicación define el resultado final.',
    girasol: 'El girasol en botón floral es muy sensible a Sclerotinia. La aplicación preventiva es determinante para el rendimiento.',
    default: 'La protección de cultivos es la inversión de mayor retorno en esta etapa del ciclo productivo.',
  },
  semillas: {
    maiz: 'Los híbridos de maíz con alto potencial requieren reserva anticipada. Asegurar cupo evita escasez y sobreprecios al momento de la siembra.',
    soja: 'La elección del grupo de madurez y el tratamiento profesional de semillas definen el stand de plantas y el potencial del lote.',
    trigo: 'La calidad de la semilla de trigo —sanidad y poder germinativo— es la base del rendimiento. Los lotes certificados garantizan densidad óptima.',
    girasol: 'Los híbridos de girasol de alto oleico permiten diferenciar el precio final. La elección correcta según zona y fecha es crítica.',
    default: 'La inversión en semilla de calidad es la que mejor retorno tiene por unidad de superficie en toda la campaña.',
  },
  fertilizantes: {
    maiz: 'El maíz es el cultivo más demandante en nitrógeno. La dosis y fuente de N determinan directamente el techo de rendimiento.',
    soja: 'La soja fija N atmosférico pero responde a fósforo y azufre. La fertilización completa mejora arranque y nodulación.',
    trigo: 'El trigo es muy responsivo a N. El fraccionamiento siembra + macollaje maximiza la eficiencia de uso del nitrógeno.',
    girasol: 'El girasol responde a fósforo y boro. La deficiencia de boro en floración impacta directamente la formación del capítulo.',
    default: 'La fertilización eficiente es una de las inversiones de mayor retorno por hectárea en la producción extensiva.',
  },
  maquinaria: {
    default: 'La inversión en maquinaria con financiamiento en USD a 4 años permite renovar el parque sin presionar el flujo de caja de la campaña.',
    cosecha: 'Con la cosecha próxima, maquinaria propia o financiada reduce dependencia de contratistas y mejora la ventana operativa.',
    pre_siembra: 'La siembra directa de calidad requiere sembradora en buen estado. Momento ideal para renovar antes de la campaña.',
  },
  financiamiento: {
    default: 'El préstamo de campaña BBVA da flexibilidad para distribuir capital entre los distintos insumos según evolución de precios y necesidades.',
  },
};

// ── Próxima etapa (para recomendaciones anticipadas) ──

const NEXT_ETAPA = {
  pre_siembra: 'siembra',
  siembra: 'desarrollo',
  desarrollo: 'proteccion',
  proteccion: 'cosecha',
  cosecha: 'poscosecha',
  poscosecha: 'pre_siembra'
};

const ANTICIPATION = {
  pre_siembra: {
    msg: 'La siembra arranca pronto',
    cats: {
      semillas: 'Reservá semillas antes de que escaseen — los cupos se agotan rápido en los mejores híbridos.',
      fertilizantes: 'Asegurá fertilizantes de base a precio actual. Comprar anticipado puede ahorrarte 5–10% vs. compra en campaña.',
    }
  },
  siembra: {
    msg: 'El cultivo entrará en desarrollo',
    cats: {
      proteccion_cultivos: 'Planificá la protección fitosanitaria ahora — tener el producto en depósito evita aplicar tarde por falta de stock.',
      fertilizantes: 'La fertilización nitrogenada de macollaje o V6 se define ahora. Asegurá la fuente.',
    }
  },
  desarrollo: {
    msg: 'La etapa de protección se acerca',
    cats: {
      proteccion_cultivos: 'Tené listo el programa fitosanitario completo. Un fungicida aplicado a tiempo vale más que dos tarde.',
    }
  },
  proteccion: {
    msg: 'La cosecha se aproxima',
    cats: {
      maquinaria: 'Si necesitás renovar cosechadora o cabezal, financiar ahora te da la máquina lista para la ventana de cosecha.',
      financiamiento: 'Buen momento para asegurar capital de trabajo — la logística de cosecha requiere liquidez.',
    }
  },
  cosecha: {
    msg: 'Post-cosecha: momento ideal para planificar',
    cats: {
      maquinaria: 'Con el ingreso de la cosecha, es el mejor momento para renovar maquinaria con financiamiento a largo plazo.',
      semillas: 'Reservá semillas para la próxima campaña. Los cupos premium se asignan ahora.',
      financiamiento: 'Planificá el capital para la campaña que viene — las mejores tasas se negocian en la entre-campaña.',
    }
  },
  poscosecha: {
    msg: 'La próxima campaña arranca pronto',
    cats: {
      semillas: 'Asegurá cupo de semillas para la próxima siembra — la compra anticipada garantiza disponibilidad y mejores precios.',
      fertilizantes: 'Los fertilizantes de base se compran ahora. La logística de fósforo se complica cerca de la siembra.',
      maquinaria: 'Entre campañas es el momento de mejor negociación para maquinaria.',
    }
  }
};

// ── Estado global de la aplicación ──

const appState = {
  polygon: null,
  ha: 0,
  detResult: null,
  recoResult: null,
  allScored: [],
  activeCatFilter: 'all',
  apiRaw: null,
  histAnalysis: null
};
