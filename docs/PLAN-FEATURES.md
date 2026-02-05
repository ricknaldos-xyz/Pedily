# Definicion de Planes Pedily

> Documento interno que define exactamente que incluye cada plan.

**Ultima actualizacion:** Febrero 2026

---

## Resumen Ejecutivo

| Caracteristica | Inicio (S/ 249) | Crecimiento (S/ 499) | Empresa (S/ 999) |
|----------------|-----------------|----------------------|------------------|
| **Canales** | Web | Web + WhatsApp IA | Web + WhatsApp + Kiosko |
| **Pagos online** | Yape, Plin, efectivo | + Tarjetas (Culqi) | + POS IZIPAY |
| **Facturacion SUNAT** | No | Si (automatica) | Si (multi-local) |
| **Usuarios** | 2 | 5 con roles | Ilimitados |
| **Soporte** | Email | Prioritario | Dedicado |

---

## 1. Canales de Venta

### Web Storefront (Tienda Online)

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Tu tienda con dominio pedily.com/tutienda | ✅ | ✅ | ✅ |
| Dominio personalizado (tutienda.com) | ❌ | ❌ | ✅ |
| Catalogo de productos ilimitado | ✅ | ✅ | ✅ |
| Categorias y subcategorias | ✅ | ✅ | ✅ |
| Variantes (tamanos, presentaciones) | ✅ | ✅ | ✅ |
| Modificadores/personalizaciones | ✅ | ✅ | ✅ |
| Imagenes de productos | ✅ | ✅ | ✅ |
| Carrito de compras | ✅ | ✅ | ✅ |
| Checkout completo | ✅ | ✅ | ✅ |
| Horarios de atencion | ✅ | ✅ | ✅ |
| Pausar tienda temporalmente | ✅ | ✅ | ✅ |
| SEO basico (meta tags) | ✅ | ✅ | ✅ |
| SSL incluido (HTTPS) | ✅ | ✅ | ✅ |

### Bot de WhatsApp con IA (Claude)

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Bot conversacional 24/7 | ❌ | ✅ | ✅ |
| IA Claude para respuestas naturales | ❌ | ✅ | ✅ |
| Toma de pedidos automatica | ❌ | ✅ | ✅ |
| Envio de catalogo por WhatsApp | ❌ | ✅ | ✅ |
| Confirmacion de pedido automatica | ❌ | ✅ | ✅ |
| Intervencion humana cuando quieras | ❌ | ✅ | ✅ |
| Historial de conversaciones | ❌ | ✅ | ✅ |
| Mensajes masivos a clientes | ❌ | ❌ | ✅ |

### Kiosko de Autoservicio

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| App para tablet (Android) | ❌ | ❌ | ✅ |
| Catalogo visual touch-friendly | ❌ | ❌ | ✅ |
| Carrito y checkout en kiosko | ❌ | ❌ | ✅ |
| Integracion POS IZIPAY | ❌ | ❌ | ✅ |
| Pago con tarjeta en kiosko | ❌ | ❌ | ✅ |
| Pago con QR (Yape/Plin) en kiosko | ❌ | ❌ | ✅ |
| Impresion de ticket | ❌ | ❌ | ✅ |

---

## 2. Metodos de Pago

### Pagos Manuales

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Efectivo contra entrega | ✅ | ✅ | ✅ |
| Yape (QR manual/numero) | ✅ | ✅ | ✅ |
| Plin (QR manual/numero) | ✅ | ✅ | ✅ |
| Transferencia bancaria | ✅ | ✅ | ✅ |

### Pagos con Tarjeta (Online)

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Culqi - Visa/Mastercard | ❌ | ✅ | ✅ |
| Culqi - American Express | ❌ | ✅ | ✅ |
| Culqi - Diners Club | ❌ | ✅ | ✅ |

### Pagos POS (Presencial)

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| IZIPAY - Tarjeta contactless | ❌ | ❌ | ✅ |
| IZIPAY - Chip/banda magnetica | ❌ | ❌ | ✅ |
| IZIPAY - QR interoperable | ❌ | ❌ | ✅ |

**Nota sobre comisiones de pasarela:**
- Culqi: ~3.5% + IGV por transaccion (lo cobra Culqi, no Pedily)
- IZIPAY: ~2.5-3.5% segun negociacion (lo cobra IZIPAY, no Pedily)
- Pedily NO cobra comision adicional sobre ventas

---

## 3. Hub Administrativo

### Gestion de Pedidos

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Vista de pedidos en tiempo real | ✅ | ✅ | ✅ |
| Notificaciones de nuevos pedidos | ✅ | ✅ | ✅ |
| Estados: Nuevo → Preparando → Listo → Entregado | ✅ | ✅ | ✅ |
| Historial de pedidos | ✅ | ✅ | ✅ |
| Detalle completo del pedido | ✅ | ✅ | ✅ |
| Notas internas en pedidos | ✅ | ✅ | ✅ |
| Filtros por estado/fecha/canal | ❌ | ✅ | ✅ |
| Busqueda de pedidos | ❌ | ✅ | ✅ |
| Cancelacion con motivo | ❌ | ✅ | ✅ |
| Reembolsos | ❌ | ✅ | ✅ |

### Gestion de Productos

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| CRUD de productos | ✅ | ✅ | ✅ |
| CRUD de categorias | ✅ | ✅ | ✅ |
| Variantes y precios por variante | ✅ | ✅ | ✅ |
| Modificadores (extras, personalizaciones) | ✅ | ✅ | ✅ |
| Activar/desactivar productos | ✅ | ✅ | ✅ |
| Ordenar productos y categorias | ✅ | ✅ | ✅ |
| Productos destacados | ❌ | ✅ | ✅ |
| Importacion masiva (Excel) | ❌ | ❌ | ✅ |

### Usuarios y Roles

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Usuarios incluidos | 2 | 5 | Ilimitados |
| Rol: Administrador (acceso total) | ✅ | ✅ | ✅ |
| Rol: Operador (solo pedidos) | ❌ | ✅ | ✅ |
| Rol: Cocina (solo vista produccion) | ❌ | ✅ | ✅ |
| Rol: Cajero (pagos y cierre) | ❌ | ✅ | ✅ |
| Rol: Delivery (solo entregas) | ❌ | ✅ | ✅ |
| Roles personalizados | ❌ | ❌ | ✅ |

### Reportes y Analiticas

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Dashboard basico (ventas del dia) | ✅ | ✅ | ✅ |
| Ventas por periodo | ❌ | ✅ | ✅ |
| Productos mas vendidos | ❌ | ✅ | ✅ |
| Ventas por canal (web/whatsapp/kiosko) | ❌ | ✅ | ✅ |
| Ticket promedio | ❌ | ✅ | ✅ |
| Horarios pico | ❌ | ✅ | ✅ |
| Comparativa periodos | ❌ | ❌ | ✅ |
| Exportar a Excel | ❌ | ❌ | ✅ |
| Reportes programados por email | ❌ | ❌ | ✅ |

---

## 4. Delivery y Logistica

### Zonas de Cobertura

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Zonas de delivery | 3 zonas | Ilimitadas | Ilimitadas |
| Precio por zona | ✅ | ✅ | ✅ |
| Tiempo estimado por zona | ✅ | ✅ | ✅ |
| Monto minimo por zona | ✅ | ✅ | ✅ |
| Mapa visual de cobertura | ❌ | ✅ | ✅ |
| Delivery gratis condicional | ❌ | ✅ | ✅ |

### Integraciones de Delivery

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Delivery propio (repartidores propios) | ✅ | ✅ | ✅ |
| PedidosYa Envios (courier on-demand) | ❌ | ❌ | ✅ |
| Tracking en tiempo real | ❌ | ❌ | ✅ |

### Recojo en Tienda

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Opcion de recojo habilitada | ✅ | ✅ | ✅ |
| Horarios de recojo | ✅ | ✅ | ✅ |
| Notificacion "pedido listo" | ✅ | ✅ | ✅ |

---

## 5. Facturacion Electronica (SUNAT)

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Boleta electronica automatica | ❌ | ✅ | ✅ |
| Factura electronica automatica | ❌ | ✅ | ✅ |
| Integracion Nubefact | ❌ | ✅ | ✅ |
| Envio automatico al cliente | ❌ | ✅ | ✅ |
| Consulta por codigo QR | ❌ | ✅ | ✅ |
| Notas de credito | ❌ | ✅ | ✅ |
| Multi-RUC (varios locales) | ❌ | ❌ | ✅ |

**Nota:** El costo de Nubefact esta incluido en el plan (Pedily lo asume).

---

## 6. CRM y Clientes

### Base de Datos de Clientes

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Registro automatico de clientes | ✅ (basico) | ✅ (completo) | ✅ (completo) |
| Datos: nombre, telefono, email | ✅ | ✅ | ✅ |
| Direcciones guardadas | ❌ | ✅ | ✅ |
| Historial de pedidos por cliente | ❌ | ✅ | ✅ |
| Notas internas por cliente | ❌ | ✅ | ✅ |
| Segmentacion de clientes | ❌ | ❌ | ✅ |
| Exportar base de datos | ❌ | ✅ | ✅ |

### Cuentas de Usuario (para clientes)

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Login con telefono/email | ❌ | ✅ | ✅ |
| Perfil del cliente | ❌ | ✅ | ✅ |
| Mis pedidos (historial) | ❌ | ✅ | ✅ |
| Mis direcciones guardadas | ❌ | ✅ | ✅ |
| Repetir pedido anterior | ❌ | ✅ | ✅ |

---

## 7. Fidelizacion y Marketing

### Sistema de Puntos

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Acumulacion de puntos por compra | ❌ | ✅ | ✅ |
| Canje de puntos por descuento | ❌ | ✅ | ✅ |
| Configurar ratio puntos/soles | ❌ | ✅ | ✅ |
| Puntos por referido | ❌ | ❌ | ✅ |

### Cupones y Descuentos

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Cupones de descuento (codigo) | ✅ | ✅ | ✅ |
| Descuento porcentual | ✅ | ✅ | ✅ |
| Descuento monto fijo | ✅ | ✅ | ✅ |
| Limite de usos por cupon | ✅ | ✅ | ✅ |
| Fecha de expiracion | ✅ | ✅ | ✅ |
| Cupon de primer pedido | ❌ | ✅ | ✅ |
| Cupon por producto especifico | ❌ | ✅ | ✅ |

### Programa de Referidos

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Codigo unico por cliente | ❌ | ❌ | ✅ |
| Recompensa al referidor | ❌ | ❌ | ✅ |
| Descuento al referido | ❌ | ❌ | ✅ |
| Tracking de referidos | ❌ | ❌ | ✅ |

---

## 8. Soporte y Onboarding

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Centro de ayuda (docs) | ✅ | ✅ | ✅ |
| Soporte por email | ✅ | ✅ | ✅ |
| Soporte por WhatsApp | ❌ | ✅ | ✅ |
| Tiempo de respuesta | 48h | 24h | 4h |
| Onboarding asistido | ❌ | ❌ | ✅ |
| Llamada de setup inicial | ❌ | ❌ | ✅ |
| Account manager dedicado | ❌ | ❌ | ✅ |
| Capacitacion a equipo | ❌ | ❌ | ✅ |

---

## 9. Tecnico y Avanzado

| Feature | Inicio | Crecimiento | Empresa |
|---------|--------|-------------|---------|
| Hosting incluido | ✅ | ✅ | ✅ |
| SSL (HTTPS) | ✅ | ✅ | ✅ |
| Backups automaticos | ✅ | ✅ | ✅ |
| Uptime garantizado | 99.5% | 99.9% | 99.99% |
| Dominio personalizado | ❌ | ❌ | ✅ |
| Acceso API | ❌ | ❌ | ✅ |
| Webhooks | ❌ | ❌ | ✅ |
| Integraciones custom | ❌ | ❌ | ✅ |
| Early access (funciones nuevas) | ❌ | ❌ | ✅ |
| Multi-local / Multi-marca | ❌ | ❌ | ✅ |

---

## 10. Limites

| Limite | Inicio | Crecimiento | Empresa |
|--------|--------|-------------|---------|
| Productos | Ilimitados | Ilimitados | Ilimitados |
| Pedidos/mes | Ilimitados | Ilimitados | Ilimitados |
| Categorias | Ilimitadas | Ilimitadas | Ilimitadas |
| Zonas delivery | 3 | Ilimitadas | Ilimitadas |
| Usuarios | 2 | 5 | Ilimitados |
| Locales/sucursales | 1 | 1 | Ilimitados |
| Almacenamiento (imagenes) | 1 GB | 5 GB | 20 GB |
| Conversaciones WhatsApp/mes | - | 1,000 | Ilimitadas |

---

## Resumen Visual por Plan

### Plan Inicio (S/ 249/mes)
```
Canal: Solo Web
Pagos: Yape, Plin, Efectivo
Hub: Basico
Usuarios: 2
SUNAT: No
Fidelizacion: Solo cupones
Soporte: Email
```
**Ideal para:** Negocios que recien empiezan a vender online, dark kitchens pequenas, emprendimientos.

### Plan Crecimiento (S/ 499/mes)
```
Canales: Web + WhatsApp Bot IA
Pagos: + Tarjetas (Culqi)
Hub: Completo con roles
Usuarios: 5
SUNAT: Boleta/Factura automatica
Fidelizacion: Puntos + Cupones
Soporte: Prioritario (24h)
```
**Ideal para:** Restaurantes establecidos, negocios con volumen medio, locales que quieren automatizar.

### Plan Empresa (S/ 999/mes)
```
Canales: Web + WhatsApp + Kiosko
Pagos: + POS IZIPAY
Hub: Completo + Reportes Excel
Usuarios: Ilimitados
SUNAT: Multi-RUC
Fidelizacion: Puntos + Cupones + Referidos
Delivery: PedidosYa integrado
Soporte: Dedicado + Onboarding
Extras: Dominio propio, API, early access
```
**Ideal para:** Locales con alto volumen, cadenas, franquicias, multi-local.

---

## Notas Importantes

1. **Sin comisiones por venta:** Pedily cobra tarifa fija. Las comisiones de pasarela (Culqi ~3.5%, IZIPAY ~2.5%) las cobra el proveedor de pagos, no Pedily.

2. **Costos incluidos:** El precio del plan incluye hosting, SSL, Nubefact, y soporte. No hay costos ocultos.

3. **Hardware no incluido:** Para el plan Empresa con kiosko, el cliente debe tener tablet Android y terminal IZIPAY. Pedily puede asesorar en la compra.

4. **WhatsApp Business API:** El costo del API de Meta (~$0.05-0.15 por conversacion) esta incluido en los planes Crecimiento y Empresa hasta el limite indicado.

5. **Upgrade inmediato:** Puedes subir de plan en cualquier momento. Se prorratea la diferencia.

6. **Downgrade:** Solo al renovar. No hay reembolso por funciones no usadas.
