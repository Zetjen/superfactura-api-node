export type SendDTEOptions = {
  mail?: string;
  savePDF?: string;
  getPDF?: 1 | 0;
  saveXML?: string;
  getXML?: 1 | 0;
  saveHTML?: string;
  getHTML?: 1 | 0;
  saveEscPos?: boolean;
  getEscPos?: 1 | 0;
  documentID?: string;
  encoding?: string;
  import?: number;
  isSigned?: 1 | 0;
  fix?: 1 | 0;
  printer?: string;
  model?: string;
  copias?: number;
  cedible?: 1 | 0;
  url?: string;
  fileExtensions?: {
    xml?: string;
    pdf?: string;
    html?: string;
    escpos?: string;
  };
};

export type SIIEnvironment = "cer" | "pro" | "dem";

export type SendDTEResponse = {
  response: {
    ok: string;
    folio: string;
  };
  html: string;
  ack: string;
};
