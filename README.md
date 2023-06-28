# SuperFactura

> Permite la conexión a SuperFactura o SuperBoleta desde sistemas desarrollados en NODE JS.

## Requisitos

Para usar la API, se requiere una cuenta previamente registrada en SuperFactura o SuperBoleta
[SuperFactura](https://superfactura.cl/) y [SuperBoleta](https://superboleta.cl/) crear la cuenta es gratuita y solo se debe pagar una vez que se empieza a usar.

## Getting Started

Estas instrucciones están diseñadas para hacer usar la API de manera rápida y sencilla.
Para saber más información sobre la API, puedes ir al blog para desarrolladores de SuperFactura.

## Instalación

Se debe crear la cuenta de SuperFactura y configurar el contribuyente.
Si se quiere usar el ambiente producción se debe marcar la opción de pasar a producción en el formulario.

```
npm i superfactura
```

## Uso

### Inicializando clase de SuperFacturaAPI

```js
const SuperFacturaAPI = require("superfactura");
```

```js
const api = new SuperFacturaAPI("usuario", "contraseña", "ambiente");
```

Al llamar a la clase de SF, se deben entregar los datos del usuario (correo y contraseña), también se puede pasar el ambiente, se guardarán los datos entregados para luego poder llamar a las funciones de la clase.

### Emitiendo un documento

```js
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

También todas las contribuciones del repositorio github para [.NET](https://github.com/kripper/superfactura-api-net/contributors) quienes participaron en el desarrollo inicial.

## License

[BSD 3](https://angelzimmermann.de/licences/BSD3) © Angel Zimmermann
