// PENDIENTE DE REVISIÓN LEGAL (plan Pedily, L-08): RUC y domicilio del
// operador, correos de contacto, permanencia y tope de responsabilidad esperan
// los datos del dueño y la revisión de un abogado.
import { PaginaLegal } from "@/components/pagina/PaginaLegal";
import { CONTACT_EMAIL, EMPRESA } from "@/lib/site";
import {
  altaProporcional,
  EJEMPLO_ALTA,
  MESES_PERMANENCIA_ALTA_GRATIS,
  PLANES,
  soles,
} from "@/lib/planes";
import { FUNDADORES } from "@/lib/site";

export const metadata = {
  title: "Términos y condiciones | Pedily",
  description: "Términos y condiciones de uso de Pedily.",
};

function Contacto() {
  return CONTACT_EMAIL ? (
    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
  ) : (
    <a href="/contacto">nuestra página de contacto</a>
  );
}

export default function TerminosPage() {
  return (
    <PaginaLegal titulo="Términos y condiciones" actualizado="Última actualización: 15 de noviembre de 2026" ruta="/legal/terminos">
          <p>
            Bienvenido a Pedily. Al contratar y usar Pedily aceptas estos
            términos. Léelos con calma: están escritos para que se entiendan.
          </p>

          <h2>1. Qué es Pedily</h2>
          <p>
            Pedily es un servicio en línea que permite a negocios de comida
            vender por sus propios canales (tienda web, asistente de pedidos
            por WhatsApp, kiosko de autoservicio y QR de mesa) y gestionar sus pedidos,
            cobros y comprobantes. Pedily es operado por {EMPRESA.razonSocial}
            {EMPRESA.ruc && <>, con RUC {EMPRESA.ruc}</>}
            {EMPRESA.domicilioFiscal && (
              <>, con domicilio en {EMPRESA.domicilioFiscal}</>
            )}
            , empresa peruana.
          </p>

          <h2>2. Tu cuenta</h2>
          <p>
            Para usar Pedily te damos acceso a un panel. Eres responsable de
            mantener tu contraseña segura y de lo que pase en tu cuenta. Si
            sospechas que alguien entró sin permiso, avísanos de inmediato.
          </p>

          <h2>3. Planes y pagos</h2>
          <p>
            Los precios de los planes están publicados en nuestra web, con IGV
            incluido, y pueden cambiar con aviso previo de 30 días. El pago es
            por adelantado, mensual o anual según elijas. Pedily no cobra
            comisión por pedido ni al restaurante ni a sus clientes.
          </p>
          <ul>
            <li>
              Lo que cobran otros proveedores (Culqi, Nubefact, Meta por los
              mensajes de WhatsApp) lo pagas directamente a cada uno, según sus
              propias tarifas.
            </li>
            <li>Si no pagas, tu cuenta puede suspenderse hasta regularizar.</li>
            <li>No hay reembolsos por meses no usados, salvo casos especiales.</li>
          </ul>

          <h2>4. Alta y permanencia</h2>
          <p>
            El alta (la puesta en marcha de tu tienda) cuesta:{" "}
            {PLANES.map((p, i) => (
              <span key={p.id}>
                {i > 0 && (i === PLANES.length - 1 ? " y " : ", ")}
                {soles(p.alta)} en el plan {p.nombre}
              </span>
            ))}
            . Es gratis si mantienes tu plan al menos{" "}
            {MESES_PERMANENCIA_ALTA_GRATIS} meses. Si terminas el servicio
            antes, pagas la parte del alta que corresponde a los meses que
            faltan: alta × (meses que faltan ÷ {MESES_PERMANENCIA_ALTA_GRATIS}),
            redondeado a sol entero. Por ejemplo, en el plan{" "}
            {EJEMPLO_ALTA.plan}, si te vas tras {EJEMPLO_ALTA.mesesPagados}{" "}
            meses pagas {soles(EJEMPLO_ALTA.alta)} ×{" "}
            {MESES_PERMANENCIA_ALTA_GRATIS - EJEMPLO_ALTA.mesesPagados}/
            {MESES_PERMANENCIA_ALTA_GRATIS} ={" "}
            {soles(altaProporcional(EJEMPLO_ALTA.alta, EJEMPLO_ALTA.mesesPagados))}.
            Para terminar el servicio, avísanos por escrito.
          </p>
          {FUNDADORES.activo && (
            <p>
              Los restaurantes del programa de fundadores (los primeros{" "}
              {FUNDADORES.cupos}) tienen el alta gratis sin condición de
              permanencia y su precio congelado{" "}
              {FUNDADORES.mesesPrecioCongelado} meses desde el alta.
            </p>
          )}

          <h2>5. Uso aceptable</h2>
          <p>Te comprometes a:</p>
          <ul>
            <li>Usar Pedily solo para fines legales.</li>
            <li>No vender productos prohibidos o regulados sin permiso.</li>
            <li>Mantener la información de tu negocio actualizada.</li>
            <li>No intentar vulnerar, sobrecargar o dañar la plataforma.</li>
            <li>
              No usar WhatsApp para enviar spam ni mensajes no solicitados.
            </li>
          </ul>

          <h2>6. Contenido y datos</h2>
          <p>
            Mantienes la propiedad de todo el contenido que subes (fotos,
            descripciones, precios). Nos das permiso para mostrarlo en tu
            tienda y procesarlo para que el sistema funcione.
          </p>
          <p>
            Los datos de tus clientes son tuyos. Nosotros solo los tratamos por
            tu cuenta, para que puedas gestionar tus pedidos. Consulta nuestra{" "}
            <a href="/legal/privacidad">política de privacidad</a>.
          </p>

          <h2>7. Disponibilidad del servicio</h2>
          <p>
            Trabajamos para que Pedily funcione todo el tiempo, pero no podemos
            garantizar una disponibilidad perfecta. Puede haber mantenimientos
            programados o caídas inesperadas. Te avisaremos cuando sea posible.
          </p>

          <h2>8. Servicios de terceros</h2>
          <p>
            Pedily se conecta con servicios de terceros como Culqi, WhatsApp
            (Meta), Nubefact, Google Maps y PedidosYa. Cada uno tiene sus
            propios términos, que debes aceptar con ellos. No somos
            responsables de fallas o cambios en esos servicios.
          </p>

          <h2>9. Limitación de responsabilidad</h2>
          <p>Pedily es una herramienta para vender y gestionar pedidos. No somos responsables de:</p>
          <ul>
            <li>La calidad de los productos que vendes.</li>
            <li>Problemas de reparto o de repartidores.</li>
            <li>Disputas entre tú y tus clientes.</li>
            <li>Pérdidas económicas por caídas del servicio o errores del sistema.</li>
          </ul>

          <h2>10. Fin del servicio</h2>
          <p>Cuando termina el servicio:</p>
          <ul>
            <li>Tu tienda deja de estar disponible.</li>
            <li>Tendrás 30 días para pedirnos tus datos antes de eliminarlos.</li>
            <li>Los pagos ya realizados no son reembolsables.</li>
          </ul>
          <p>
            También podemos terminar el servicio si incumples estos términos,
            con aviso previo salvo casos graves.
          </p>

          <h2>11. Cambios en los términos</h2>
          <p>
            Podemos actualizar estos términos. Te avisaremos por correo con al
            menos 15 días de anticipación. Si sigues usando Pedily después del
            cambio, aceptas los nuevos términos.
          </p>

          <h2>12. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes del Perú. Cualquier disputa
            se resolverá en los tribunales de Lima.
          </p>

          <h2>13. Contacto</h2>
          <p>
            Si tienes dudas sobre estos términos, escríbenos a través de{" "}
            <Contacto />.
          </p>
    </PaginaLegal>
  );
}
