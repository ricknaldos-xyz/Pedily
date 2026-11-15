// PENDIENTE DE REVISIÓN LEGAL (plan Pedily, L-08): RUC y domicilio del
// operador, correos de contacto, plazos de conservación y anexo de encargo de
// datos esperan los datos del dueño y la revisión de un abogado.
import { Container } from "@/components/layout/Container";
import { CONTACT_EMAIL, EMPRESA } from "@/lib/site";

export const metadata = {
  title: "Política de privacidad | Pedily",
  description: "Cómo Pedily recopila, usa y protege los datos personales.",
};

function Contacto() {
  return CONTACT_EMAIL ? (
    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
  ) : (
    <a href="/contacto">nuestra página de contacto</a>
  );
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-sand-900 sm:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-4 text-sm text-sand-500">
          Última actualización: 15 de noviembre de 2026
        </p>

        <div className="legal mt-10 max-w-none space-y-4 text-sand-700">
          <p>
            En Pedily nos tomamos en serio la privacidad. Esta política explica
            qué datos recopilamos, cómo los usamos y cómo los protegemos, en
            lenguaje simple.
          </p>

          <h2>1. Quién es responsable de tus datos</h2>
          <p>
            {EMPRESA.razonSocial}
            {EMPRESA.ruc && <> (RUC {EMPRESA.ruc})</>}, la empresa peruana que
            opera Pedily, es responsable del tratamiento de los datos de los
            restaurantes que contratan Pedily.
            {EMPRESA.domicilioFiscal && <> Domicilio: {EMPRESA.domicilioFiscal}.</>}{" "}
            Puedes contactarnos a través de <Contacto />.
          </p>

          <h2>2. Qué datos recopilamos</h2>
          <h3>De los dueños de negocio (tú):</h3>
          <ul>
            <li>
              <strong>Datos de cuenta:</strong> nombre, correo, teléfono y
              contraseña cifrada.
            </li>
            <li>
              <strong>Datos del negocio:</strong> nombre comercial, RUC,
              dirección, logo y horarios.
            </li>
            <li>
              <strong>Datos de pago:</strong> los procesa Culqi; no guardamos
              tarjetas.
            </li>
            <li>
              <strong>Datos de uso:</strong> cómo usas la plataforma y qué
              funciones usas más.
            </li>
          </ul>

          <h3>De los clientes finales (quienes compran en tu tienda):</h3>
          <ul>
            <li>
              <strong>Datos de pedido:</strong> nombre, teléfono, dirección de
              entrega y correo.
            </li>
            <li>
              <strong>Historial de compras:</strong> pedidos realizados, montos
              y fechas.
            </li>
            <li>
              <strong>Conversaciones:</strong> chats de WhatsApp para procesar
              pedidos.
            </li>
          </ul>

          <h2>3. Para qué usamos los datos</h2>
          <ul>
            <li>Crear y mantener tu cuenta y tu tienda en línea.</li>
            <li>Procesar pedidos y pagos.</li>
            <li>Enviar avisos de pedidos (a ti y a tus clientes).</li>
            <li>Emitir boletas y facturas electrónicas ante SUNAT.</li>
            <li>Mejorar la plataforma según cómo la usas.</li>
            <li>Enviarte comunicaciones sobre tu cuenta (sin spam).</li>
            <li>Cumplir obligaciones legales y tributarias.</li>
          </ul>

          <h2>4. Con quién compartimos los datos</h2>
          <p>
            Solo compartimos datos con terceros cuando hace falta para que el
            servicio funcione:
          </p>
          <ul>
            <li>
              <strong>Culqi:</strong> para procesar cobros.
            </li>
            <li>
              <strong>WhatsApp (Meta):</strong> para el asistente de pedidos.
            </li>
            <li>
              <strong>Anthropic:</strong> la IA que usa el asistente para
              entender y responder los mensajes.
            </li>
            <li>
              <strong>Google Maps:</strong> para ubicar direcciones y calcular
              la cobertura de reparto.
            </li>
            <li>
              <strong>Nubefact:</strong> para emitir comprobantes ante SUNAT.
            </li>
            <li>
              <strong>PedidosYa:</strong> si usas su servicio de envíos.
            </li>
            <li>
              <strong>Alojamiento:</strong> Vercel y Supabase, para guardar los
              datos de forma segura.
            </li>
          </ul>
          <p>No vendemos tus datos ni los de tus clientes a terceros.</p>

          <h2>5. Datos de tus clientes: tu responsabilidad</h2>
          <p>
            Los datos de las personas que compran en tu tienda son tuyos. Tú
            eres responsable de:
          </p>
          <ul>
            <li>Informarles que recopilas sus datos y para qué.</li>
            <li>Cumplir las leyes de protección de datos del Perú.</li>
            <li>Atender sus pedidos de acceso, corrección o eliminación.</li>
          </ul>
          <p>
            Pedily actúa como encargado del tratamiento de esos datos, siguiendo
            tus instrucciones.
          </p>

          <h2>6. Cuánto tiempo guardamos los datos</h2>
          <ul>
            <li>
              <strong>Datos de cuenta:</strong> mientras tu cuenta esté activa,
              y 30 días después de que termine el servicio.
            </li>
            <li>
              <strong>Datos de pedidos:</strong> el tiempo que exigen las
              obligaciones tributarias (SUNAT).
            </li>
            <li>
              <strong>Conversaciones de WhatsApp:</strong> el tiempo necesario
              para atender los pedidos y las consultas.
            </li>
          </ul>

          <h2>7. Cómo protegemos los datos</h2>
          <ul>
            <li>Conexiones cifradas (HTTPS) en toda la plataforma.</li>
            <li>Contraseñas cifradas, nunca guardadas en texto plano.</li>
            <li>Base de datos con acceso restringido.</li>
            <li>Proveedores de alojamiento de confianza (Vercel, Supabase).</li>
          </ul>

          <h2>8. Tus derechos</h2>
          <p>Según la ley peruana, tienes derecho a:</p>
          <ul>
            <li>
              <strong>Acceder</strong> a tus datos personales.
            </li>
            <li>
              <strong>Rectificar</strong> datos incorrectos o incompletos.
            </li>
            <li>
              <strong>Cancelar</strong> (eliminar) tus datos cuando ya no sean
              necesarios.
            </li>
            <li>
              <strong>Oponerte</strong> a ciertos usos de tus datos.
            </li>
          </ul>
          <p>
            Para ejercer estos derechos, escríbenos a través de <Contacto />.
          </p>

          <h2>9. Cookies</h2>
          <p>Usamos cookies para:</p>
          <ul>
            <li>Mantener tu sesión iniciada.</li>
            <li>Recordar tus preferencias.</li>
          </ul>
          <p>
            Puedes desactivar las cookies en tu navegador, pero algunas
            funciones podrían no funcionar bien.
          </p>

          <h2>10. Cambios en esta política</h2>
          <p>
            Si hacemos cambios importantes, te avisaremos por correo con al
            menos 15 días de anticipación. Los cambios menores se publican
            directamente aquí.
          </p>

          <h2>11. Contacto</h2>
          <p>
            ¿Dudas sobre privacidad? Escríbenos a través de <Contacto />.
          </p>
        </div>
      </Container>
    </div>
  );
}
