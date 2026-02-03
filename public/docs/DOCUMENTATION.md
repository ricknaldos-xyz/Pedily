# Pedily - Documentacion del Producto

> Plataforma SaaS multicanal para negocios de comida: tienda web, bot de WhatsApp
> con IA y kiosko de autoservicio. Sin comisiones por venta.

**Version:** 2.0
**Ultima actualizacion:** Febrero 2026
**Sitio web:** [pedily.com](https://pedily.com)

---

## Tabla de Contenidos

1. [Vision General](#1-vision-general)
2. [Tienda Online](#2-tienda-online)
3. [Proceso de Compra](#3-proceso-de-compra)
4. [Metodos de Pago](#4-metodos-de-pago)
5. [Bot de WhatsApp](#5-bot-de-whatsapp)
6. [Kiosko de Autoservicio](#6-kiosko-de-autoservicio)
7. [Dashboard de Operaciones](#7-dashboard-de-operaciones)
8. [Sistema de Roles](#8-sistema-de-roles)
9. [Delivery](#9-delivery)
10. [Fidelizacion](#10-fidelizacion)
11. [Integraciones](#11-integraciones)
12. [Stack Tecnologico](#12-stack-tecnologico)
13. [API Reference](#13-api-reference)
14. [Planes y Precios](#14-planes-y-precios)

---

## 1. Vision General

### Que es Pedily

Pedily es una plataforma SaaS disenada exclusivamente para negocios de comida
-- restaurantes, cafeterias, panaderias, dark kitchens y servicios de catering --
que necesitan recibir pedidos de forma profesional a traves de multiples canales.

A diferencia de los marketplaces tradicionales que cobran comisiones del 20-30%
por cada venta, Pedily opera bajo un modelo de suscripcion mensual fija, lo que
permite a los negocios mantener el control total de sus margenes.

### Propuesta de Valor: 3 Canales, 1 Sistema

```
+---------------------------------------------------------------------+
|                                                                       |
|   PEDILY: Tu negocio de comida, en 3 canales                         |
|                                                                       |
|   [Tienda Web]  +  [WhatsApp Bot]  +  [Kiosko]  =  Pedidos Multicanal|
|        |               |                |                             |
|        +---------------+----------------+                             |
|                        |                                              |
|                [Hub de Pedidos]  --- Tiempo real via Supabase        |
|                        |                                              |
|            +-----------+-----------+                                  |
|            |           |           |                                  |
|         [Cocina]  [Delivery]  [Cliente]                              |
|                                                                       |
+---------------------------------------------------------------------+
```

### Canales de Venta

| Canal | Descripcion | Disponibilidad |
|-------|-------------|----------------|
| **Tienda Web** | Catalogo online con carrito de compras, checkout completo y seguimiento de pedido | Todos los planes |
| **Bot de WhatsApp** | Asistente conversacional impulsado por Claude AI que guia al cliente desde el catalogo hasta el pago | Plan Crecimiento+ |
| **Kiosko Autoservicio** | Terminal tactil en tienda para que clientes ordenen sin hacer cola. Integrado con IZIPAY | Plan Empresa |

### Principios Fundamentales

- **Sin comisiones por venta.** Tarifa plana mensual, sin importar el volumen de pedidos.
- **Multicanal.** Un solo hub para gestionar pedidos de la web, WhatsApp y kiosko.
- **Tiempo real.** Actualizaciones instantaneas de estado via Supabase Realtime.
- **Inteligencia artificial.** Bot de WhatsApp potenciado por Claude AI de Anthropic.
- **Autonomia total.** El negocio controla su catalogo, precios, zonas de delivery y marca.

---

## 2. Tienda Online

La tienda online es el escaparate digital del negocio. Cada negocio registrado
en Pedily obtiene una tienda accesible desde `https://{slug}.pedily.com` o un
dominio personalizado.

### 2.1 Catalogo de Productos

El catalogo esta organizado en una jerarquia de dos niveles:

```
Tienda
  |
  +-- Categoria (ej: "Pizzas")
  |     |
  |     +-- Producto (ej: "Pizza Margarita")
  |     |     |
  |     |     +-- Presentacion / Variante (ej: "Personal", "Familiar")
  |     |     +-- Modificador / Customizacion (ej: "Extra queso", "Sin cebolla")
  |     |
  |     +-- Producto (ej: "Pizza Pepperoni")
  |           +-- ...
  |
  +-- Categoria (ej: "Bebidas")
        +-- ...
```

### 2.2 Categorias

Las categorias permiten agrupar productos de forma logica. Cada categoria tiene:

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `name` | `string` | Nombre visible en el catalogo |
| `slug` | `string` | Identificador URL-friendly (auto-generado) |
| `description` | `string?` | Descripcion opcional |
| `image` | `string?` | URL de imagen representativa |
| `sortOrder` | `number` | Orden de aparicion en el catalogo |
| `isActive` | `boolean` | Visibilidad en la tienda |
| `discount` | `number?` | Descuento porcentual aplicable a todos los productos de la categoria |

### 2.3 Productos

Cada producto representa un articulo del menu con las siguientes propiedades:

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `name` | `string` | Nombre del producto |
| `slug` | `string` | Identificador URL-friendly |
| `description` | `string?` | Descripcion para el cliente |
| `basePrice` | `number` | Precio base en soles (PEN) |
| `promotionalPrice` | `number?` | Precio promocional (si aplica) |
| `categoryId` | `string` | Categoria a la que pertenece |
| `images` | `string[]` | URLs de imagenes del producto |
| `isActive` | `boolean` | Disponibilidad en el catalogo |
| `isFeatured` | `boolean` | Aparece en la seccion destacada |
| `stock` | `number?` | Cantidad disponible (`null` = ilimitado) |
| `preparationTime` | `number?` | Tiempo estimado de preparacion en minutos |

### 2.4 Variantes y Presentaciones

Las variantes permiten ofrecer un mismo producto en diferentes tamanos o
presentaciones, cada una con su propio precio.

**Ejemplo:**

| Producto | Variante | Precio |
|----------|----------|--------|
| Pizza Margarita | Personal | S/ 18.00 |
| Pizza Margarita | Mediana | S/ 28.00 |
| Pizza Margarita | Familiar | S/ 42.00 |

Cuando un producto tiene variantes, el `basePrice` del producto se utiliza como
precio de referencia y cada variante define su propio precio final.

### 2.5 Modificadores y Personalizaciones

Los modificadores permiten al cliente personalizar su pedido. Se organizan en
**grupos de modificadores**, cada uno con sus propias reglas:

| Propiedad del Grupo | Descripcion |
|----------------------|-------------|
| `name` | Nombre del grupo (ej: "Toppings extra") |
| `isRequired` | Si el cliente debe elegir al menos una opcion |
| `minSelections` | Minimo de opciones a seleccionar |
| `maxSelections` | Maximo de opciones permitidas |
| `options` | Lista de opciones disponibles |

Cada **opcion** dentro de un grupo tiene:

| Propiedad | Descripcion |
|-----------|-------------|
| `name` | Nombre de la opcion (ej: "Extra queso") |
| `price` | Costo adicional (puede ser 0) |
| `isDefault` | Si viene seleccionada por defecto |
| `isActive` | Si esta disponible actualmente |

**Ejemplo de un grupo de modificadores:**

```
Grupo: "Elige tu proteina" (requerido, min: 1, max: 1)
  - Pollo        +S/ 0.00  [default]
  - Res          +S/ 3.00
  - Cerdo        +S/ 2.00
  - Vegetariano  +S/ 0.00

Grupo: "Extras" (opcional, min: 0, max: 3)
  - Extra queso     +S/ 2.50
  - Palta           +S/ 3.00
  - Tocino          +S/ 4.00
  - Huevo frito     +S/ 2.00
```

### 2.6 Precios y Promociones

El sistema de precios soporta multiples capas:

```
Precio final = Precio variante (o basePrice)
             - Descuento de categoria (%)
             - Descuento de cupon (fijo o %)
             + Suma de modificadores seleccionados
```

- **Precio base:** Precio estandar del producto.
- **Precio promocional:** Precio temporal que reemplaza al base cuando esta activo.
- **Descuento de categoria:** Porcentaje aplicado a todos los productos de una categoria.
- **Cupones:** Descuentos adicionales aplicados en el checkout (ver seccion de Fidelizacion).

### 2.7 Control de Stock

El control de stock es opcional por producto:

- **Stock ilimitado (`null`):** El producto siempre esta disponible.
- **Stock numerico:** Se decrementa con cada pedido confirmado. Cuando llega a 0, el producto se muestra como "Agotado" y no se puede agregar al carrito.
- **Desactivacion manual:** El operador puede desactivar un producto temporalmente sin afectar el stock.

### 2.8 Imagenes

Las imagenes se almacenan en **Supabase Storage** y se sirven a traves de su CDN.

- Formato recomendado: JPEG o WebP.
- Tamano maximo: 5 MB por imagen.
- Se soportan multiples imagenes por producto (galeria).
- Las imagenes se optimizan automaticamente al servirse.

---

## 3. Proceso de Compra

### 3.1 Flujo General (Web)

```
[Catalogo] --> [Producto] --> [Agregar al Carrito]
                                      |
                                      v
                               [Carrito de Compras]
                                      |
                                      v
                              [Datos del Cliente]
                               (nombre, telefono)
                                      |
                                      v
                            [Direccion de Entrega]
                             (o Recojo en tienda)
                                      |
                                      v
                             [Metodo de Pago]
                                      |
                                      v
                          [Seleccion de Comprobante]
                           (Boleta o Factura)
                                      |
                                      v
                             [Confirmacion]
                                      |
                                      v
                          [Seguimiento del Pedido]
```

### 3.2 Carrito de Compras

El carrito de compras se gestiona del lado del cliente usando **Zustand** como
store de estado. Las caracteristicas incluyen:

- Agregar productos con variantes y modificadores seleccionados.
- Modificar cantidades directamente desde el carrito.
- Eliminar items individuales.
- Persistencia en `localStorage` para no perder el carrito al cerrar el navegador.
- Calculo automatico de subtotales, descuentos y total.
- Aplicacion de codigos de cupon.

**Estructura de un item en el carrito:**

```typescript
interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  customizations: {
    groupId: string;
    selectedOptions: {
      optionId: string;
      price: number;
    }[];
  }[];
  notes?: string;
}
```

### 3.3 Checkout

El proceso de checkout se divide en pasos secuenciales:

#### Paso 1: Datos del Cliente

Para clientes no registrados (guest checkout), se solicita:

- Nombre completo
- Numero de telefono (obligatorio, formato peruano)
- Correo electronico (opcional)

Los clientes registrados ya tienen esta informacion precargada.

#### Paso 2: Tipo de Entrega

El cliente elige entre:

| Opcion | Descripcion |
|--------|-------------|
| **Delivery** | Entrega a domicilio. Se calcula el costo segun la zona de cobertura. |
| **Recojo en tienda** | El cliente recoge el pedido en el local. Sin costo de envio. |

#### Paso 3: Direccion de Entrega

Si el cliente elige delivery:

- Ingresa la direccion manualmente o selecciona una guardada.
- Se valida que la direccion este dentro de la zona de cobertura.
- Se calcula automaticamente el costo de envio.
- Se muestra la direccion en un mapa de Google Maps para confirmacion.

#### Paso 4: Metodo de Pago

Se presentan los metodos de pago habilitados por el negocio (ver seccion 4).

#### Paso 5: Seleccion de Comprobante

El cliente selecciona el tipo de comprobante tributario:

| Tipo | Campos Requeridos |
|------|-------------------|
| **Boleta** | Solo nombre (datos del cliente) |
| **Factura** | RUC, Razon Social, Direccion Fiscal |

#### Paso 6: Confirmacion

Se muestra un resumen completo del pedido:

- Detalle de productos con cantidades y precios.
- Subtotal.
- Descuentos aplicados.
- Costo de delivery.
- Total final.
- Tipo de comprobante seleccionado.

Al confirmar, se crea el pedido en estado `PENDING_REVIEW` y se redirige al
cliente a la pantalla de seguimiento.

### 3.4 Guest Checkout

Pedily permite realizar compras sin necesidad de crear una cuenta. El flujo de
guest checkout:

1. El cliente navega el catalogo y agrega productos al carrito.
2. En el checkout, ingresa sus datos basicos (nombre y telefono).
3. Completa el pedido normalmente.
4. Recibe un enlace de seguimiento por WhatsApp (si el negocio tiene habilitado el bot).
5. Sus datos se almacenan para futuros pedidos automaticamente, vinculados al numero de telefono.

### 3.5 Cupones de Descuento

En el carrito o durante el checkout, el cliente puede ingresar un codigo de
cupon. El sistema valida:

- Que el codigo exista y este activo.
- Que no haya expirado.
- Que el pedido cumpla con el monto minimo (si aplica).
- Que el cliente no haya excedido el limite de usos.

---

## 4. Metodos de Pago

Pedily soporta multiples metodos de pago adaptados al mercado peruano, con
diferentes integraciones segun el canal de venta.

### 4.1 Resumen de Metodos por Canal

| Metodo | Web | WhatsApp Bot | Kiosko |
|--------|:---:|:------------:|:------:|
| **Tarjeta (Culqi)** | Si | Si | -- |
| **Tarjeta (IZIPAY)** | -- | -- | Si |
| **QR (IZIPAY)** | -- | -- | Si |
| **Yape** | Si | Si | Si |
| **Plin** | Si | Si | Si |
| **Contra entrega** | Si | Si | -- |

### 4.2 Culqi - Tarjetas de Credito y Debito (Web/WhatsApp)

[Culqi](https://culqi.com) es la pasarela de pagos integrada para procesar
tarjetas en la tienda web y pedidos del bot de WhatsApp. Soporta:

- Visa, Mastercard, American Express, Diners Club.
- Tarjetas peruanas e internacionales.
- Tokenizacion segura (los datos de tarjeta nunca tocan los servidores de Pedily).
- Procesamiento en soles peruanos (PEN).

**Flujo de pago con Culqi:**

```
[Cliente ingresa tarjeta] --> [Culqi genera token]
        |
        v
[Backend crea cargo en Culqi] --> [Culqi procesa pago]
        |
        +-- Exitoso --> Pedido confirmado
        |
        +-- Rechazado --> Se notifica al cliente
```

### 4.3 IZIPAY - POS para Kiosko

[IZIPAY](https://izipay.pe) es la solucion de pago para el kiosko de autoservicio.
Permite aceptar pagos con tarjeta y QR directamente en la terminal.

**Metodos soportados:**

- Tarjetas de credito y debito (chip, contactless, banda).
- Codigos QR (billeteras digitales).
- Yape y Plin via QR.

**Arquitectura:**

```
[Kiosko (Next.js)] <--WebSocket--> [POS Bridge (Supabase Realtime)]
                                          |
                                          v
                                   [Terminal IZIPAY]
                                          |
                                          v
                                   [Respuesta de pago]
```

El kiosko se comunica con la terminal IZIPAY a traves de Supabase Realtime,
permitiendo una experiencia de pago fluida sin necesidad de hardware adicional.

### 4.4 Yape

Yape es la billetera digital mas popular del Peru. El flujo en Pedily es:

1. El cliente selecciona "Yape" como metodo de pago.
2. Se muestra el numero de Yape del negocio y/o codigo QR.
3. El cliente realiza la transferencia desde su app de Yape.
4. El cliente sube una foto del comprobante de pago (voucher).
5. El operador del negocio verifica el comprobante y confirma el pedido.

### 4.5 Plin

Plin funciona de manera identica a Yape:

1. El cliente selecciona "Plin" como metodo de pago.
2. Se muestra el numero de Plin del negocio y codigo QR generado dinamicamente.
3. El cliente realiza la transferencia.
4. El cliente sube el comprobante de pago.
5. El operador verifica y confirma.

### 4.6 Contra Entrega (Efectivo)

El cliente paga en efectivo al momento de recibir el pedido. El operador puede
registrar si el cliente necesita cambio (vuelto).

### 4.7 Verificacion de Comprobantes de Pago

Para Yape y Plin, el sistema incluye un flujo de verificacion:

```
[Cliente sube imagen] --> [Almacenamiento en Supabase Storage]
         |
         v
[Operador ve la imagen en el Hub] --> [Aprobar / Rechazar]
         |
         +-- Aprobado --> Pedido pasa a CONFIRMED
         |
         +-- Rechazado --> Se notifica al cliente
```

La imagen del comprobante:
- Se almacena en Supabase Storage en un bucket dedicado.
- Se muestra directamente en el detalle del pedido en el Hub.
- Solo es visible para usuarios con rol ADMIN, SUPER_ADMIN u OPERADOR.

### 4.8 Facturacion Electronica SUNAT

Cada pedido genera automaticamente un comprobante electronico validado por SUNAT:

**Boleta:**
- Documento de venta para personas naturales.
- Solo requiere el nombre del cliente.
- Se genera automaticamente via Nubefact.

**Factura:**
- Documento tributario para empresas.
- Requiere: RUC (11 digitos), Razon Social, Direccion Fiscal.
- Se valida el formato del RUC antes de aceptar.

Los comprobantes se generan como PDF y XML, y se almacenan en el pedido para
descarga posterior.

---

## 5. Bot de WhatsApp

El bot de WhatsApp es uno de los diferenciadores principales de Pedily. Permite
a los clientes realizar pedidos completos a traves de una conversacion natural
en WhatsApp, potenciado por **Claude AI** de Anthropic.

### 5.1 Arquitectura del Bot

```
                    +------------------+
                    |  WhatsApp Cloud  |
                    |   Business API   |
                    +--------+---------+
                             |
                    Webhook (POST /bot/webhook)
                             |
                    +--------v---------+
                    |   NestJS Backend |
                    |   Bot Module     |
                    +--------+---------+
                             |
              +--------------+--------------+
              |              |              |
     +--------v---+  +------v------+  +----v--------+
     |   FSM      |  |  Claude AI  |  |  Supabase   |
     | Controller |  |  (Anthropic)|  |  (Storage)  |
     +--------+---+  +------+------+  +----+--------+
              |              |              |
              +--------------+--------------+
                             |
                    +--------v---------+
                    |  Base de Datos   |
                    |  (PostgreSQL)    |
                    +------------------+
```

### 5.2 Maquina de Estados Finitos (FSM)

El bot opera con una maquina de estados finitos que controla el flujo de la
conversacion. Cada conversacion tiene un estado actual que determina como se
procesan los mensajes entrantes.

#### Estados del Bot

| Estado | Descripcion |
|--------|-------------|
| `WELCOME` | Estado inicial. Saludo y presentacion del negocio. |
| `AI_CONVERSATION` | Conversacion libre con Claude AI. El bot responde preguntas generales sobre el menu, horarios, etc. |
| `MAIN_MENU` | Menu principal con opciones: ver catalogo, hacer pedido, ver historial, soporte. |
| `CATALOG` | Muestra las categorias de productos disponibles. |
| `PRODUCT_DETAIL` | Muestra detalles de un producto especifico con variantes y modificadores. |
| `CART` | Muestra el carrito actual con opciones para modificar o proceder al pago. |
| `PRE_CHECKOUT` | Solicita datos del cliente si es la primera vez (nombre, confirmacion de telefono). |
| `ADDRESS` | Solicita la direccion de entrega o seleccion de una direccion guardada. |
| `PAYMENT_METHOD` | Presenta los metodos de pago disponibles. |
| `CONFIRMATION` | Muestra resumen del pedido y solicita confirmacion final. |
| `TRACKING` | Permite al cliente consultar el estado de su pedido activo. |
| `SUPPORT` | Canal de soporte: preguntas frecuentes y contacto con el negocio. |
| `PROMOTIONS` | Muestra promociones activas y cupones disponibles. |
| `ORDER_HISTORY` | Lista de pedidos anteriores del cliente. |
| `FEEDBACK` | Solicita calificacion y comentarios sobre un pedido completado. |
| `HUMAN_REQUEST` | El cliente ha solicitado hablar con un humano. Se envia notificacion al negocio. |
| `HUMAN_TAKEOVER` | Un operador ha tomado el control de la conversacion. El bot se desactiva temporalmente. |

### 5.3 Integracion con Claude AI

El bot utiliza la API de Claude AI (Anthropic) para:

- **Comprension de lenguaje natural:** Interpreta mensajes del cliente en lenguaje
  coloquial peruano, incluyendo jerga y abreviaciones.
- **Recomendaciones:** Sugiere productos basandose en las preferencias del cliente
  o en lo que es popular.
- **Resolucion de dudas:** Responde preguntas sobre ingredientes, alergenos, horarios,
  metodos de pago, zonas de cobertura, etc.
- **Contexto de conversacion:** Mantiene el hilo de la conversacion para una
  experiencia fluida.

El sistema de prompts incluye:
- Informacion del negocio (nombre, horarios, contacto).
- Catalogo completo de productos con precios.
- Zonas de cobertura y costos de envio.
- Politicas del negocio.
- Instrucciones de personalidad y tono.

### 5.4 Human Takeover

Cuando el bot no puede resolver una consulta o el cliente solicita hablar con
una persona:

1. La conversacion pasa al estado `HUMAN_REQUEST`.
2. Se envia una notificacion en tiempo real al Hub de Operaciones.
3. Un operador o administrador toma el control (`HUMAN_TAKEOVER`).
4. El operador responde directamente desde el Hub a traves de WhatsApp.
5. Cuando termina, el operador devuelve el control al bot.

### 5.5 Gestion de Conversaciones

Cada conversacion se almacena con:

- Historial completo de mensajes (cliente y bot).
- Estado actual de la FSM.
- Datos del carrito en progreso.
- Datos del cliente asociado.
- Timestamp de ultimo mensaje.
- Flag de human takeover activo.

Las conversaciones inactivas por mas de 24 horas se resetean al estado
`WELCOME` automaticamente.

---

## 6. Kiosko de Autoservicio

El kiosko es una aplicacion para tablets que permite a los clientes ordenar
directamente en el local, sin necesidad de hacer cola o interactuar con personal.

### 6.1 Casos de Uso

- **Restaurantes de comida rapida:** Agiliza el flujo de clientes en horas pico.
- **Patios de comida:** Permite ordenar sin esperar turno.
- **Cafeterias:** Pedidos rapidos de bebidas y snacks.
- **Locales con alto trafico:** Reduce tiempos de espera y errores en pedidos.

### 6.2 Arquitectura del Kiosko

```
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|    Kiosko App     | <---> |   Backend API     | <---> |    PostgreSQL     |
|    (Next.js 16)   |       |    (NestJS)       |       |                   |
|                   |       |                   |       |                   |
+--------+----------+       +-------------------+       +-------------------+
         |
         | WebSocket (Supabase Realtime)
         |
+--------v----------+
|                   |
|  Terminal IZIPAY  |
|  (POS Bridge)     |
|                   |
+-------------------+
```

### 6.3 Flujo de Pedido en Kiosko

```
[Pantalla de Inicio] --> [Seleccionar Categoria]
         |
         v
   [Ver Productos] --> [Agregar al Carrito]
         |                    |
         v                    v
   [Personalizar]      [Ver Carrito]
   (modificadores)           |
         |                   v
         +----------> [Confirmar Pedido]
                            |
                            v
                    [Seleccionar Pago]
                     (Tarjeta/QR/Yape)
                            |
                            v
                    [Procesar con IZIPAY]
                            |
                            v
                    [Ticket + Boleta]
                            |
                            v
                     [Pedido al Hub]
```

### 6.4 Caracteristicas del Kiosko

| Caracteristica | Descripcion |
|----------------|-------------|
| **Interfaz tactil** | Disenada para tablets de 10"+ con botones grandes y navegacion intuitiva |
| **Catalogo visual** | Fotos de productos, precios claros, categorias con iconos |
| **Personalizaciones** | Soporte completo para variantes y modificadores |
| **Pagos integrados** | Tarjeta, QR y Yape/Plin via terminal IZIPAY |
| **Facturacion automatica** | Emision de boleta electronica al confirmar |
| **Sincronizacion** | Pedidos llegan al Hub y cocina en tiempo real |
| **Modo offline** | Catalogo cacheado para continuar operando sin internet (pagos requieren conexion) |

### 6.5 Integracion con IZIPAY

El kiosko se conecta con terminales IZIPAY para procesar pagos:

1. El cliente confirma su pedido y selecciona metodo de pago.
2. El kiosko envia la solicitud de cobro al POS Bridge via Supabase Realtime.
3. La terminal IZIPAY muestra el monto y solicita la tarjeta/QR.
4. El cliente realiza el pago en la terminal.
5. IZIPAY envia la confirmacion de vuelta al kiosko.
6. El kiosko genera el ticket, emite la boleta y crea el pedido en el Hub.

### 6.6 Configuracion del Kiosko

| Parametro | Descripcion |
|-----------|-------------|
| `terminalId` | ID de la terminal IZIPAY asociada |
| `storeId` | ID de la sucursal |
| `idleTimeout` | Tiempo en segundos para volver a pantalla de inicio (default: 120) |
| `printTicket` | Si se imprime ticket fisico (requiere impresora conectada) |
| `requireInvoice` | Si siempre pide datos para factura |

---

## 7. Dashboard de Operaciones

El Dashboard de Operaciones (Hub) es el centro de control del negocio. Permite
gestionar pedidos de los 3 canales, productos, clientes y configuraciones.

### 7.1 Hub de Pedidos

El Hub de Pedidos es la pantalla principal del dashboard. Muestra todos los
pedidos en tiempo real usando **Supabase Realtime** (WebSockets).

#### Vista General

```
+---------------------------------------------------------------+
|  Hub de Pedidos                           [Web] [WA] [Kiosko]  |
+---------------------------------------------------------------+
|                                                                |
|  PENDIENTES (3)  |  EN COCINA (2)  |  LISTOS (1)  |  EN RUTA  |
|  +------------+  |  +----------+   |  +---------+  |           |
|  | Pedido #45 |  |  | Ped #42  |   |  | Ped #40 |  |           |
|  | Juan P.    |  |  | Maria L. |   |  | Carlos  |  |           |
|  | S/ 45.00   |  |  | S/ 32.00 |   |  | S/ 28.00|  |           |
|  | Web        |  |  | WhatsApp |   |  | Kiosko  |  |           |
|  | 5 min ago  |  |  | 12 min   |   |  | 20 min  |  |           |
|  +------------+  |  +----------+   |  +---------+  |           |
|  +------------+  |  +----------+   |                |           |
|  | Pedido #44 |  |  | Ped #41  |   |                |           |
|  | ...        |  |  | ...      |   |                |           |
|  +------------+  |  +----------+   |                |           |
+---------------------------------------------------------------+
```

#### Filtros por Canal

El Hub permite filtrar pedidos por canal de origen:

- **Web:** Pedidos de la tienda online
- **WhatsApp:** Pedidos del bot conversacional
- **Kiosko:** Pedidos del terminal de autoservicio

#### Pre-ordenes (Yape/Plin)

Para pedidos realizados con Yape o Plin, existe una columna especial de
**Pre-ordenes** que muestra los pedidos que estan pendientes de verificacion de
comprobante de pago. El operador puede:

- Ver la imagen del comprobante directamente en el detalle del pedido.
- Aprobar el pago y mover el pedido a `CONFIRMED`.
- Rechazar el pago y notificar al cliente.

### 7.2 Estados del Pedido

Cada pedido transita por una serie de estados que reflejan su progreso:

| Estado | Codigo | Descripcion | Siguiente Estado |
|--------|--------|-------------|------------------|
| Pendiente de revision | `PENDING_REVIEW` | Pedido recibido, esperando confirmacion del negocio | CONFIRMED / CANCELLED |
| Confirmado | `CONFIRMED` | Pedido aceptado por el negocio | IN_KITCHEN |
| En cocina | `IN_KITCHEN` | Pedido en preparacion | READY / PICKUP_READY |
| Listo | `READY` | Pedido preparado, esperando delivery | IN_DELIVERY |
| Listo para recojo | `PICKUP_READY` | Pedido preparado, esperando que el cliente lo recoja | DELIVERED |
| En camino | `IN_DELIVERY` | Pedido en ruta al cliente | DELIVERED |
| Entregado | `DELIVERED` | Pedido entregado al cliente | (Final) |
| Cancelado | `CANCELLED` | Pedido cancelado | (Final) |
| Problema | `ISSUE` | Hay un problema con el pedido (reclamo, devolucion) | DELIVERED / CANCELLED |

### 7.3 Origen del Pedido

Cada pedido registra su canal de origen:

| Source | Descripcion |
|--------|-------------|
| `WEB` | Pedido desde la tienda online |
| `WHATSAPP_BOT` | Pedido desde el bot de WhatsApp |
| `KIOSK` | Pedido desde el terminal de autoservicio |

### 7.4 Gestion de Productos

Desde el dashboard, los administradores pueden:

- **Crear productos:** Nombre, descripcion, precio, categoria, imagenes.
- **Editar productos:** Modificar cualquier campo, incluyendo precio y stock.
- **Gestionar variantes:** Crear, editar y eliminar presentaciones.
- **Gestionar modificadores:** Crear grupos de modificadores con opciones y precios.
- **Activar/Desactivar:** Controlar la disponibilidad sin eliminar.
- **Ordenar:** Drag-and-drop para establecer el orden en el catalogo.
- **Duplicar:** Crear un producto nuevo basado en uno existente.

### 7.5 Gestion de Categorias

- Crear y editar categorias con nombre, descripcion e imagen.
- Establecer descuentos por categoria (porcentaje).
- Ordenar categorias para la vista del catalogo.
- Activar o desactivar categorias completas.

### 7.6 Base de Datos de Clientes

El dashboard incluye un CRM basico con:

- Lista de clientes con nombre, telefono, email y fecha de registro.
- Historial de pedidos por cliente.
- Total gastado y numero de pedidos.
- Direcciones guardadas del cliente.
- Canal de origen (web, WhatsApp o kiosko).
- Puntos de fidelizacion acumulados.

### 7.7 Configuracion de la Tienda

| Configuracion | Descripcion |
|---------------|-------------|
| Informacion del negocio | Nombre, logo, descripcion, contacto |
| Horarios de atencion | Dias y horas de operacion |
| Zonas de delivery | Areas de cobertura con costos |
| Metodos de pago | Activar/desactivar y configurar claves |
| Datos de Yape/Plin | Numeros e imagenes QR para pagos |
| Datos de IZIPAY | Terminal ID para kiosko |
| Dominio personalizado | Configurar dominio propio |
| Notificaciones | Preferencias de alertas |
| Datos fiscales | RUC y razon social del negocio |
| Tema y colores | Personalizacion visual de la tienda |

---

## 8. Sistema de Roles

Pedily implementa un sistema de control de acceso basado en roles (RBAC) con
cinco niveles jerarquicos.

### 8.1 Definicion de Roles

| Rol | Descripcion | Alcance |
|-----|-------------|---------|
| `SUPER_ADMIN` | Administrador de la plataforma Pedily. Acceso total a todos los negocios. | Plataforma completa |
| `ADMIN` | Dueno o gerente del negocio. Acceso total a su tienda. | Un negocio |
| `OPERADOR` | Empleado encargado de gestionar pedidos y atencion al cliente. | Hub de pedidos + Clientes |
| `COCINA` | Personal de cocina. Solo ve pedidos en preparacion. | Vista de cocina |
| `CLIENT` | Cliente final que realiza compras. | Tienda + su historial |

### 8.2 Matriz de Permisos

| Recurso / Accion | SUPER_ADMIN | ADMIN | OPERADOR | COCINA | CLIENT |
|-------------------|:-----------:|:-----:|:--------:|:------:|:------:|
| Ver todos los negocios | Si | -- | -- | -- | -- |
| Configurar tienda | Si | Si | -- | -- | -- |
| Gestionar productos | Si | Si | -- | -- | -- |
| Gestionar categorias | Si | Si | -- | -- | -- |
| Gestionar modificadores | Si | Si | -- | -- | -- |
| Ver hub de pedidos | Si | Si | Si | Parcial | -- |
| Cambiar estado de pedido | Si | Si | Si | Si (*) | -- |
| Verificar comprobantes | Si | Si | Si | -- | -- |
| Ver detalle de pedido | Si | Si | Si | Si | Propios |
| Gestionar clientes | Si | Si | Si | -- | -- |
| Gestionar usuarios/staff | Si | Si | -- | -- | -- |
| Gestionar cupones | Si | Si | -- | -- | -- |
| Gestionar zonas delivery | Si | Si | -- | -- | -- |
| Ver reportes | Si | Si | Parcial | -- | -- |
| Responder WhatsApp (human takeover) | Si | Si | Si | -- | -- |
| Realizar pedidos | -- | -- | -- | -- | Si |
| Ver su historial | -- | -- | -- | -- | Si |
| Gestionar sus direcciones | -- | -- | -- | -- | Si |

> (*) El rol COCINA solo puede mover pedidos de `IN_KITCHEN` a `READY` o `PICKUP_READY`.

### 8.3 Vista de Cocina

El rol `COCINA` tiene una vista simplificada y especializada:

- Solo muestra pedidos en estado `CONFIRMED` e `IN_KITCHEN`.
- Vista de tarjetas con detalle de productos y modificadores.
- Boton unico para marcar como "Listo".
- Sin acceso a precios, datos del cliente ni informacion financiera.
- Disenada para tablets montadas en la cocina.

---

## 9. Delivery

### 9.1 Zonas de Cobertura

Pedily utiliza **Google Maps** para definir y gestionar zonas de cobertura de
delivery. El administrador puede:

- Configurar costos de envio por distrito.
- Crear multiples zonas con diferentes costos.
- Activar o desactivar zonas segun necesidad.

**Ejemplo de configuracion por distrito (Lima):**

| Distrito | Costo Delivery | Tiempo Estimado |
|----------|----------------|-----------------|
| Miraflores | S/ 6.00 | 30 min |
| San Isidro | S/ 6.00 | 35 min |
| Barranco | S/ 8.00 | 40 min |
| Surquillo | S/ 6.00 | 25 min |
| San Borja | S/ 8.00 | 40 min |
| Surco | S/ 10.00 | 50 min |
| La Molina | S/ 12.00 | 60 min |

### 9.2 Calculo Automatico del Costo de Envio

Cuando el cliente ingresa su direccion en el checkout:

1. Se geocodifica la direccion usando Google Maps Geocoding API.
2. Se determina el distrito de la direccion.
3. Se asigna automaticamente el costo de envio configurado para ese distrito.
4. Si el distrito no tiene cobertura, se informa al cliente y se sugiere recojo en tienda.

### 9.3 Integracion con PedidosYa

Para negocios que desean tercerizar el delivery, Pedily ofrece integracion con
**PedidosYa Envios**:

- El negocio conecta su cuenta de PedidosYa desde la configuracion.
- Al confirmar un pedido con delivery, se puede solicitar un repartidor de PedidosYa automaticamente.
- El tracking del repartidor se muestra tanto en el Hub como al cliente.
- El costo de PedidosYa se calcula segun la distancia y se puede trasladar al cliente o absorberlo el negocio.

### 9.4 Validacion de Direcciones

El sistema valida las direcciones del cliente:

- Autocompletado con Google Places API para reducir errores.
- Verificacion de que la direccion tiene nivel de calle (no solo distrito).
- Solicitud de referencias adicionales (piso, interior, referencias).
- Alerta si la direccion parece estar fuera de la zona de cobertura.

### 9.5 Multiples Direcciones por Cliente

Los clientes registrados pueden:

- Guardar multiples direcciones con etiquetas (ej: "Casa", "Oficina").
- Seleccionar rapidamente una direccion guardada en el checkout.
- Editar o eliminar direcciones desde su perfil.
- Establecer una direccion como predeterminada.

---

## 10. Fidelizacion

Pedily incluye herramientas de fidelizacion para ayudar a los negocios a
retener clientes y aumentar la frecuencia de compra.

### 10.1 Sistema de Puntos

Los clientes acumulan puntos con cada compra:

- **Acumulacion:** Por defecto, 1 punto por cada S/ 1 gastado (configurable por el negocio).
- **Canje:** Los puntos se pueden canjear por descuentos en futuras compras.
- **Ratio de canje:** Configurable (ej: 100 puntos = S/ 5 de descuento).
- **Expiracion:** Los puntos expiran segun la configuracion del negocio (ej: 90 dias sin actividad).

### 10.2 Cupones

Los administradores pueden crear cupones de descuento con las siguientes
opciones:

| Propiedad | Descripcion |
|-----------|-------------|
| `code` | Codigo alfanumerico unico (ej: "BIENVENIDO20") |
| `type` | `FIXED` (monto fijo) o `PERCENTAGE` (porcentaje) |
| `value` | Valor del descuento (ej: 10 soles o 20%) |
| `minOrderAmount` | Monto minimo del pedido para aplicar |
| `maxDiscount` | Tope maximo de descuento (para tipo porcentaje) |
| `maxUses` | Limite total de usos del cupon |
| `maxUsesPerUser` | Limite de usos por cliente |
| `startDate` | Fecha de inicio de vigencia |
| `endDate` | Fecha de expiracion |
| `isActive` | Si el cupon esta activo |
| `applicableCategories` | Categorias a las que aplica (vacio = todas) |

### 10.3 Descuentos por Categoria

Ademas de los cupones, se puede establecer un descuento permanente o temporal
en una categoria completa. Esto es util para promociones como:

- "20% en todas las bebidas este fin de semana"
- "Postres a mitad de precio los martes"

### 10.4 Programa de Referidos

El programa de referidos incentiva a los clientes a traer nuevos compradores:

- Cada cliente tiene un codigo de referido unico.
- Cuando un nuevo cliente usa el codigo, ambos reciben un beneficio:
  - **Referidor:** Puntos bonus (configurable).
  - **Referido:** Descuento en su primera compra (configurable).
- Se trackea automaticamente la cadena de referidos.

---

## 11. Integraciones

### 11.1 Mapa de Integraciones

```
+--------------------+         +------------------+
|   Culqi            |         |  WhatsApp Cloud  |
|   (Pagos web/bot)  |         |  Business API    |
+--------+-----------+         +--------+---------+
         |                              |
         |    +----------------+        |
         +--->|                |<-------+
              |    PEDILY      |
         +--->|   BACKEND      |<-------+
         |    |   (NestJS)     |        |
         |    +-------+--------+        |
         |            |                 |
+--------+-----------+|  +--------------+--------+
|   IZIPAY           ||  |   Claude AI           |
|   (POS Kiosko)     ||  |   (Anthropic API)     |
+--------------------+|  +------------------------+
                       |
         +-------------+---------------+
         |             |               |
+--------v---+  +------v------+  +----v--------+
|  Supabase  |  |  PedidosYa  |  |   Nubefact  |
|  Realtime  |  |  Envios     |  |   (SUNAT)   |
|  Storage   |  |  (Delivery) |  |             |
+------------+  +-------------+  +-------------+
```

### 11.2 Culqi

| Aspecto | Detalle |
|---------|---------|
| Tipo | Pasarela de pagos |
| Uso | Procesamiento de tarjetas en web y WhatsApp |
| API | REST API v2 |
| Seguridad | PCI DSS Level 1, tokenizacion |
| Moneda | PEN (Soles peruanos) |

### 11.3 IZIPAY

| Aspecto | Detalle |
|---------|---------|
| Tipo | POS / Terminal de pagos |
| Uso | Pagos con tarjeta y QR en kiosko |
| Conexion | WebSocket via Supabase Realtime |
| Metodos | Tarjeta (chip, contactless), QR, Yape, Plin |

### 11.4 WhatsApp Business API

| Aspecto | Detalle |
|---------|---------|
| Tipo | Mensajeria |
| Uso | Bot conversacional + notificaciones |
| Proveedor | Meta (WhatsApp Cloud API) |
| Webhooks | Mensajes entrantes, estados de entrega |
| Templates | Confirmacion de pedido, actualizaciones de estado |

### 11.5 Claude AI (Anthropic)

| Aspecto | Detalle |
|---------|---------|
| Tipo | Inteligencia Artificial |
| Uso | Motor de conversacion del bot de WhatsApp |
| Modelo | Claude (ultimo modelo disponible) |
| Funciones | Comprension de lenguaje natural, recomendaciones, atencion al cliente |

### 11.6 Supabase

| Aspecto | Detalle |
|---------|---------|
| Tipo | Backend-as-a-Service |
| **Realtime** | WebSockets para Hub de Pedidos y comunicacion con POS IZIPAY |
| **Storage** | Almacenamiento de imagenes (productos, comprobantes de pago, facturas) |
| **Database** | PostgreSQL como base de datos principal (via Prisma ORM) |

### 11.7 Nubefact

| Aspecto | Detalle |
|---------|---------|
| Tipo | Facturacion electronica |
| Uso | Emision de boletas y facturas validadas por SUNAT |
| Formatos | PDF y XML |
| Automatico | Se genera al confirmar pedido |

### 11.8 PedidosYa

| Aspecto | Detalle |
|---------|---------|
| Tipo | Logistica de delivery |
| Uso | Solicitar repartidores externos para entregas |
| Funciones | Cotizacion, solicitud de envio, tracking |

### 11.9 Google Maps

| Aspecto | Detalle |
|---------|---------|
| Tipo | Servicios de geolocalizacion |
| **Geocoding API** | Convertir direcciones a coordenadas |
| **Places API** | Autocompletado de direcciones |

---

## 12. Stack Tecnologico

### 12.1 Frontend - Tienda Web

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| **Next.js** | 15 | Framework de React con App Router, SSR y SSG |
| **React** | 19 | Libreria de UI |
| **TypeScript** | 5.x | Tipado estatico |
| **Tailwind CSS** | 4.x | Framework de utilidades CSS |
| **Zustand** | 4.x | Estado global del cliente (carrito, UI) |
| **NextAuth.js** | 5.x | Autenticacion (JWT + sessions) |

### 12.2 Frontend - Kiosko

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| **Next.js** | 16 | Framework de React optimizado para tablets |
| **React** | 19 | Libreria de UI |
| **TypeScript** | 5.x | Tipado estatico |
| **Tailwind CSS** | 4.x | Estilos responsivos |
| **Zustand** | 4.x | Estado del carrito |
| **Framer Motion** | 11.x | Animaciones tactiles |

### 12.3 Backend

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| **NestJS** | 10 | Framework backend (modular, TypeScript nativo) |
| **Prisma** | 5.x | ORM para PostgreSQL |
| **PostgreSQL** | 15+ | Base de datos relacional principal |
| **Supabase Client** | -- | Realtime subscriptions y Storage |
| **Anthropic SDK** | -- | Integracion con Claude AI |

### 12.4 Arquitectura General

```
+------------------+     +-------------------+     +------------------+
|    FRONTENDS     |     |     BACKEND       |     |   BASE DE DATOS  |
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|  Tienda Web      | --> |  NestJS 10        | --> |  PostgreSQL      |
|  (Next.js 15)    |     |  Prisma ORM       |     |  (Supabase)      |
|                  |     |  TypeScript       |     |                  |
|  Kiosko          |     |                   |     +--------+---------+
|  (Next.js 16)    |     |  Modulos:         |              |
|                  |     |  - Auth           |     +--------v---------+
|  Landing         |     |  - Products       |     |                  |
|  (Next.js 16)    |     |  - Orders         |     |  Supabase        |
|                  |     |  - Users          |     |  - Realtime      |
+------------------+     |  - Store          |     |  - Storage       |
                         |  - Bot            |     |                  |
                         |  - WhatsApp       |     +------------------+
                         |  - Kiosk          |
                         |  - Payments       |
                         |  - Nubefact       |
                         |                   |
                         +-------------------+
```

---

## 13. API Reference

El backend de Pedily expone una API REST organizada por modulos. A continuacion
se presenta un resumen de los principales endpoints.

> **Base URL:** `https://api.pedily.com/v1`
> **Autenticacion:** Bearer token (JWT) en el header `Authorization`.

### 13.1 Autenticacion (`/auth`)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/auth/login` | Iniciar sesion con email y contrasena |
| `POST` | `/auth/register` | Registrar nuevo usuario |
| `POST` | `/auth/refresh` | Renovar token de acceso |
| `POST` | `/auth/forgot-password` | Solicitar restablecimiento de contrasena |
| `POST` | `/auth/reset-password` | Restablecer contrasena con token |
| `GET`  | `/auth/me` | Obtener informacion del usuario autenticado |

### 13.2 Productos (`/products`)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/products` | Listar productos (con paginacion y filtros) |
| `GET` | `/products/:id` | Obtener detalle de un producto |
| `POST` | `/products` | Crear producto (ADMIN+) |
| `PATCH` | `/products/:id` | Actualizar producto (ADMIN+) |
| `DELETE` | `/products/:id` | Eliminar producto (ADMIN+) |

### 13.3 Pedidos (`/orders`)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/orders` | Listar pedidos (filtros por estado, fecha, canal) |
| `GET` | `/orders/:id` | Obtener detalle de un pedido |
| `POST` | `/orders` | Crear nuevo pedido (checkout web) |
| `POST` | `/orders/kiosk` | Crear pedido desde kiosko |
| `PATCH` | `/orders/:id/status` | Cambiar estado del pedido |
| `POST` | `/orders/:id/payment-proof` | Subir comprobante de pago |

### 13.4 Bot (`/bot`)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/bot/webhook` | Webhook para mensajes entrantes de WhatsApp |
| `GET` | `/bot/webhook` | Verificacion del webhook (challenge de Meta) |
| `GET` | `/bot/conversations` | Listar conversaciones activas |
| `POST` | `/bot/conversations/:id/takeover` | Tomar control de la conversacion |
| `POST` | `/bot/conversations/:id/release` | Devolver control al bot |

### 13.5 Kiosko (`/kiosk`)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/kiosk/menu` | Obtener catalogo optimizado para kiosko |
| `POST` | `/kiosk/order` | Crear pedido desde kiosko |
| `POST` | `/kiosk/payment/init` | Iniciar pago con IZIPAY |
| `POST` | `/kiosk/payment/confirm` | Confirmar pago procesado |

### 13.6 Facturacion (`/nubefact`)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/nubefact/emit` | Emitir boleta o factura |
| `GET` | `/nubefact/document/:id` | Obtener PDF/XML de comprobante |

### 13.7 Codigos de Respuesta

| Codigo | Significado |
|--------|-------------|
| `200` | Operacion exitosa |
| `201` | Recurso creado exitosamente |
| `400` | Error de validacion en los datos enviados |
| `401` | No autenticado (token faltante o invalido) |
| `403` | No autorizado (rol insuficiente) |
| `404` | Recurso no encontrado |
| `409` | Conflicto (ej: stock insuficiente, cupon ya usado) |
| `500` | Error interno del servidor |

---

## 14. Planes y Precios

Pedily ofrece tres planes adaptados al tamano y necesidades del negocio. Todos
los planes incluyen **cero comisiones por venta**.

### 14.1 Comparativa de Planes

| Caracteristica | Inicio | Crecimiento | Empresa |
|----------------|:------:|:-----------:|:-------:|
| **Precio mensual** | **S/ 179** | **S/ 349** | **S/ 699** |
| Tienda online | Si | Si | Si |
| Productos ilimitados | Si | Si | Si |
| Pedidos ilimitados | -- | Si | Si |
| Hub de pedidos en tiempo real | Si | Si | Si |
| Metodos de pago (Yape, Plin, efectivo) | Si | Si | Si |
| Pagos con tarjeta (Culqi) | -- | Si | Si |
| Bot de WhatsApp (Claude AI) | -- | Si | Si |
| Human takeover WhatsApp | -- | Si | Si |
| Kiosko de autoservicio | -- | -- | Si |
| POS IZIPAY | -- | -- | Si |
| Zonas de delivery | 3 zonas | Ilimitadas | Ilimitadas |
| Integracion PedidosYa | -- | -- | Si |
| Sistema de puntos y fidelizacion | -- | Si | Si |
| Cupones de descuento | Basico | Si | Si |
| Programa de referidos | -- | -- | Si |
| Gestion de staff y roles | 2 usuarios | 5 usuarios | Ilimitados |
| Reportes y analitica | Basico | Avanzado | Avanzado + exportacion |
| Dominio personalizado | -- | -- | Si |
| Soporte | Email | Email + Chat | Prioritario + Telefono |
| Facturacion electronica SUNAT | -- | Si | Si |

### 14.2 Plan Inicio - S/ 179/mes

Ideal para negocios que estan empezando en el mundo digital.

**Incluye:**
- Tienda online con catalogo completo.
- Carrito de compras y checkout.
- Pagos con Yape, Plin y efectivo contra entrega.
- Hub de pedidos en tiempo real.
- 3 zonas de delivery.
- Cupones de descuento basicos.
- 2 usuarios (1 ADMIN + 1 OPERADOR).
- Soporte por email.

### 14.3 Plan Crecimiento - S/ 349/mes

Para negocios que buscan escalar sus ventas con canales digitales.

**Todo lo del plan Inicio, mas:**
- Bot de WhatsApp con inteligencia artificial (Claude AI).
- Human takeover para atencion personalizada.
- Pagos con tarjeta de credito y debito (Culqi).
- Zonas de delivery ilimitadas.
- Sistema de puntos de fidelizacion.
- Facturacion electronica SUNAT (Boleta y Factura).
- 5 usuarios con roles diferenciados.
- Reportes avanzados de ventas.
- Soporte por email y chat.

### 14.4 Plan Empresa - S/ 699/mes

Para negocios consolidados que necesitan la solucion multicanal completa.

**Todo lo del plan Crecimiento, mas:**
- Kiosko de autoservicio en tienda.
- Terminal POS con IZIPAY (tarjeta y QR).
- Integracion con PedidosYa Envios.
- Programa de referidos.
- Usuarios y roles ilimitados.
- Dominio personalizado.
- Reportes avanzados con exportacion CSV/Excel.
- Soporte prioritario con atencion telefonica.
- Onboarding personalizado.
- Acceso anticipado a nuevas funcionalidades.

### 14.5 Informacion Adicional

- **Sin contratos:** Cancela cuando quieras, sin penalidades.
- **Prueba gratuita:** 14 dias de prueba con todas las funcionalidades del plan Crecimiento.
- **Facturacion:** Mensual o anual (2 meses gratis con pago anual).
- **Moneda:** Todos los precios en soles peruanos (PEN), incluyen IGV.

---

## Glosario

| Termino | Definicion |
|---------|------------|
| **FSM** | Finite State Machine (Maquina de Estados Finitos). Patron utilizado para controlar el flujo del bot de WhatsApp. |
| **Hub** | Dashboard de operaciones donde se gestionan los pedidos en tiempo real de los 3 canales. |
| **Human Takeover** | Cuando un operador humano toma el control de una conversacion que estaba manejando el bot. |
| **Kiosko** | Terminal de autoservicio para pedidos en el local. |
| **Modificador** | Opcion de personalizacion de un producto (ej: "Extra queso"). |
| **Variante** | Presentacion diferente de un mismo producto (ej: tamano "Personal" o "Familiar"). |
| **RBAC** | Role-Based Access Control. Sistema de permisos basado en roles. |
| **Webhook** | Endpoint que recibe notificaciones automaticas de servicios externos (ej: mensajes de WhatsApp). |
| **Slug** | Identificador amigable para URLs (ej: "pizza-margarita"). |
| **PEN** | Codigo ISO 4217 para el Sol peruano. |
| **IGV** | Impuesto General a las Ventas (18% en Peru). |
| **SUNAT** | Superintendencia Nacional de Aduanas y de Administracion Tributaria del Peru. |
| **POS** | Point of Sale (Punto de Venta). Terminal para procesar pagos con tarjeta. |

---

## Contacto y Soporte

- **Email:** soporte@pedily.com
- **Web:** [pedily.com](https://pedily.com)
- **Documentacion API:** [docs.pedily.com](https://docs.pedily.com)

---

*Pedily - Potenciando negocios de comida con tecnologia multicanal.*
