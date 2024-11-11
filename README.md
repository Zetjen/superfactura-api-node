# [SuperFactura API](https://www.npmjs.com/package/superfactura)

[![Release](https://github.com/Zetjen/superfactura-api-nodejs/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Zetjen/superfactura-api-nodejs/actions/workflows/npm-publish.yml)

> Permite la integración a la API de SuperFactura o SuperBoleta desde aplicaciones desarrolladas en NODE JS para la emisión de documentos tributarios electrónicos (DTE) en Chile.

## Test

Para probar la librería ejecutar

```
npm i
npm run test
```

## Requisitos

Para usar la API, se requiere una cuenta previamente registrada en SuperFactura o SuperBoleta
[SuperFactura](https://superfactura.cl/) y [SuperBoleta](https://superboleta.cl/) crear la cuenta es gratuita y solo se debe pagar una vez que se empieza a usar.

## Getting Started

> [!IMPORTANT]  
> En caso de problemas en la libreria, por favor contactarme a los datos en mi perfil de GitHub y no contactar a SuperFactura. En caso de una falla en SuperFactura, recomiendo completamente enviar un correo antes de llamar, ya que el servicio de soporte por Email es EXCELENTE.

Estas instrucciones están diseñadas para hacer usar la API de manera rápida y sencilla.
Para saber más información sobre la API, puedes ir al blog para desarrolladores de SuperFactura.

## Instalación

Se debe crear la cuenta de SuperFactura y configurar el contribuyente.
Si se quiere usar el ambiente producción se debe marcar la opción de pasar a producción en el "Formulario del Contribuyente" en la plataforma de SuperFactura o SuperBoleta.

```
npm i superfactura
```

## Uso

### Inicializando clase de SuperFacturaAPI

```ts
import { SuperFacturaAPI } from "superfactura";
```

```ts
let superFactura = new SuperFacturaAPI(user, password);
```

Al llamar a la clase de SF, se deben entregar los datos del usuario (correo y contraseña), se guardarán los datos entregados para luego poder llamar a las funciones de la clase.

### Emitiendo un documento

```ts
await api.SendDTE(json, "ambiente", opciones);
```

El primer valor que se le pasa a "SendDTE" es el [JSON](https://superfactura.cl/pages/examples) que contiene la información del DTE
Luego se puede pasar el ambiente y [opciones adicionales](https://superfactura.cl/pages/opciones).
(!) Si no se pasa el ambiente en la función, se usara el ambiente agregado por defecto al inicializar la clase SuperFacturaAPI.

#### Recomendaciones

- Usar la opción "documentID" para evitar duplicar documentos.
- Hacer conexión con servidor local para asegurar emisión de documentos cuando no hay conexión estable

## Authors

- **Angel Zimmermann** - [AngelZimmermann](https://angelzimmermann.de)

## License

[BSD 3](https://angelzimmermann.de/licences/BSD3) © Angel Zimmermann
