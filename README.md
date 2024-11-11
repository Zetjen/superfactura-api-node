# [SuperFactura API](https://www.npmjs.com/package/superfactura)

> [DOCUMENTACIÓN EN ESPAÑOL](README.es.md)

[![Release](https://github.com/Zetjen/superfactura-api-nodejs/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Zetjen/superfactura-api-nodejs/actions/workflows/npm-publish.yml)

> Enables integration with the SuperFactura or SuperBoleta API from NODE JS applications for issuing electronic tax documents (DTE) in Chile.

## Test

To test the library, run:

```
npm i
npm run test
```

## Requirements

To use the API, you need an account previously registered with SuperFactura or SuperBoleta.
[SuperFactura](https://superfactura.cl/) and [SuperBoleta](https://superboleta.cl/) accounts are free to create, and payment is only required once usage begins.

## Getting Started

> [!IMPORTANT]  
> In case of issues with the library, please contact me using the details in my GitHub profile and do not reach out to SuperFactura. If there is a failure with SuperFactura, I highly recommend sending an email before calling, as their email support service is EXCELLENT.

These instructions are designed to help you use the API quickly and easily.
For more detailed information about the API, you can visit the SuperFactura developer blog.

## Installation

You must create a SuperFactura account and configure the taxpayer.
If you wish to use the production environment, you need to select the option to switch to production in the "Taxpayer Form" on the SuperFactura or SuperBoleta platform.

```
npm i superfactura
```

## Usage

### Initializing the SuperFacturaAPI Class

```ts
import { SuperFacturaAPI } from "superfactura";
```

```ts
let superFactura = new SuperFacturaAPI(user, password);
```

When calling the SF class, you need to provide user data (email and password). The provided data will be stored to later call the class functions.

### Issuing a Document

```ts
await api.SendDTE(json, "environment", options);
```

The first value passed to "SendDTE" is the [JSON](https://superfactura.cl/pages/examples) containing the DTE information.
Next, you can pass the environment and [additional options](https://superfactura.cl/pages/opciones).
(!) If the environment is not passed in the function, the default environment set when initializing the SuperFacturaAPI class will be used.

#### Recommendations

- Use the "documentID" option to avoid document duplication.
- Connect with a local server to ensure document issuance when there is an unstable connection.

## Authors

- **Angel Zimmermann** - [AngelZimmermann](https://angelzimmermann.de)

## License

[BSD 3](https://angelzimmermann.de/licences/BSD3) © Angel Zimmermann
