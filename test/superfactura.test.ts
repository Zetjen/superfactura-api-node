console.log("Testing SuperFactura - By Angel Zimmermann");
console.log();

// Please fill this fields for testing

const user = "user";
const password = "password";
const taxId = "00000000-0";

// Alert if fields are not filled
if (user === "user" || password === "password" || taxId === "00000000-0") {
  console.error("- Please fill the fields in the test file! \n");
  process.exit(1);
}

import { SuperFacturaAPI } from "../superfactura";

let superFactura = new SuperFacturaAPI(user, password);

const jsonData = {
  Encabezado: {
    IdDoc: {
      TipoDTE: 33,
      // 'FchEmis': '2015-01-01', // Opcional
    },
    Emisor: {
      RUTEmisor: taxId,
      // Los demás datos serán agregados por SuperFactura
    },
    Receptor: {
      RUTRecep: "1-9",
      RznSocRecep: "Test",
      GiroRecep: "Giro",
      DirRecep: "Dirección",
      CmnaRecep: "Comuna",
      CiudadRecep: "Ciudad",
    },
    // 'Totales' será agregado por SuperFactura
  },
  Detalles: [
    {
      // 'NroLinDet' será agregado por SuperFactura
      NmbItem: "Item 1",
      DscItem: "Descripción del item 1",
      QtyItem: 3,
      UnmdItem: "KG",
      PrcItem: 100,
    },
    {
      NmbItem: "Item 2",
      DscItem: "Descripción del item 2",
      QtyItem: 5,
      UnmdItem: "KG",
      PrcItem: 65,
    },
  ],
};

superFactura
  .SendDTE(jsonData, "cer", {
    documentID: "123",
  })
  .then((res) => {
    console.log(res);
  });
