// FACTURAS Y OTROS: https://www.sii.cl/factura_electronica/factura_mercado/formato_dte.pdf
// BOLETAS: https://www.sii.cl/factura_electronica/factura_mercado/boletas_elec.pdf

export type IdDoc = {
  TipoDTE: number;
  FchEmis?: string; // Opcional
  IndServicio?: 1 | 2 | 3 | 4 | 5;
  MntBruto?: 1;
};

type Emisor = {
  RUTEmisor: string;
};

type Receptor = {
  RUTRecep: string;
  RznSocRecep: string;
  GiroRecep: string;
  DirRecep: string;
  CmnaRecep: string;
  CiudadRecep: string;
};

type Encabezado = {
  IdDoc: IdDoc;
  Emisor: Emisor;
  Receptor?: Receptor;
};

type Detalle = {
  NmbItem: string;
  DscItem?: string;
  QtyItem: number;
  UnmdItem?: string;
  PrcItem: number;
};

export type SuperFacturaJSON = {
  Encabezado: Encabezado;
  Detalles: Detalle[];
};
