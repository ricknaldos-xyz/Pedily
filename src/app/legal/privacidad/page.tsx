import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Politica de Privacidad | Pedily",
  description: "Como Pedily recopila, usa y protege tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Politica de Privacidad
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Ultima actualizacion: Febrero 2026
          </p>

          <div className="prose prose-slate mt-10 max-w-none">
            <p>
              En Pedily nos tomamos en serio la privacidad. Esta politica
              explica que datos recopilamos, como los usamos y como los
              protegemos. Escrita en lenguaje simple, sin letra chica.
            </p>

            <h2>1. Quien es responsable de tus datos</h2>
            <p>
              Hub de Innovacion Digital SAC, la empresa detras de Pedily, es
              responsable del tratamiento de tus datos personales. Estamos en
              Lima, Peru, y puedes contactarnos en{" "}
              <a href="mailto:privacidad@pedily.com">privacidad@pedily.com</a>.
            </p>

            <h2>2. Que datos recopilamos</h2>

            <h3>De los duenos de negocio (tu):</h3>
            <ul>
              <li>
                <strong>Datos de cuenta:</strong> nombre, email, telefono,
                contrasena encriptada.
              </li>
              <li>
                <strong>Datos del negocio:</strong> nombre comercial, RUC,
                direccion, logo, horarios.
              </li>
              <li>
                <strong>Datos de pago:</strong> procesados por Culqi/IZIPAY, no
                almacenamos tarjetas.
              </li>
              <li>
                <strong>Datos de uso:</strong> como usas la plataforma,
                funciones que mas usas.
              </li>
            </ul>

            <h3>De los clientes finales (quienes compran en tu tienda):</h3>
            <ul>
              <li>
                <strong>Datos de pedido:</strong> nombre, telefono, direccion de
                entrega, email.
              </li>
              <li>
                <strong>Historial de compras:</strong> pedidos realizados,
                montos, fechas.
              </li>
              <li>
                <strong>Conversaciones:</strong> chats de WhatsApp para procesar
                pedidos.
              </li>
            </ul>

            <h2>3. Para que usamos los datos</h2>
            <ul>
              <li>Crear y mantener tu cuenta y tienda online.</li>
              <li>Procesar pedidos y pagos.</li>
              <li>
                Enviar notificaciones de pedidos (a ti y a tus clientes).
              </li>
              <li>Generar boletas y facturas electronicas via SUNAT.</li>
              <li>Mejorar la plataforma basandonos en como la usas.</li>
              <li>
                Enviarte comunicaciones sobre tu cuenta (no spam, lo prometemos).
              </li>
              <li>Cumplir con obligaciones legales y tributarias.</li>
            </ul>

            <h2>4. Con quien compartimos los datos</h2>
            <p>
              Solo compartimos datos con terceros cuando es necesario para que
              el servicio funcione:
            </p>
            <ul>
              <li>
                <strong>Pasarelas de pago:</strong> Culqi, IZIPAY para procesar
                cobros.
              </li>
              <li>
                <strong>WhatsApp (Meta):</strong> para el bot de pedidos.
              </li>
              <li>
                <strong>Nubefact:</strong> para emision de comprobantes SUNAT.
              </li>
              <li>
                <strong>PedidosYa:</strong> si usas su integracion de delivery.
              </li>
              <li>
                <strong>Servicios de hosting:</strong> Vercel, Supabase para
                almacenar datos de forma segura.
              </li>
            </ul>
            <p>
              No vendemos tus datos ni los de tus clientes a terceros. Nunca.
            </p>

            <h2>5. Datos de clientes finales: tu responsabilidad</h2>
            <p>
              Los datos de las personas que compran en tu tienda son tuyos. Tu
              eres responsable de:
            </p>
            <ul>
              <li>Informarles que recopilas sus datos y para que.</li>
              <li>Cumplir con las leyes de proteccion de datos de Peru.</li>
              <li>
                Atender sus solicitudes de acceso, correccion o eliminacion.
              </li>
            </ul>
            <p>
              Pedily actua como &quot;encargado del tratamiento&quot; de estos datos,
              siguiendo tus instrucciones.
            </p>

            <h2>6. Cuanto tiempo guardamos los datos</h2>
            <ul>
              <li>
                <strong>Datos de cuenta:</strong> mientras tu cuenta este
                activa, mas 30 dias despues de cancelar.
              </li>
              <li>
                <strong>Datos de pedidos:</strong> 5 anos por obligaciones
                tributarias (SUNAT).
              </li>
              <li>
                <strong>Conversaciones WhatsApp:</strong> 1 ano, luego se
                eliminan automaticamente.
              </li>
            </ul>

            <h2>7. Como protegemos los datos</h2>
            <ul>
              <li>Conexiones encriptadas (HTTPS/TLS) en toda la plataforma.</li>
              <li>Contrasenas hasheadas, nunca almacenadas en texto plano.</li>
              <li>Base de datos con acceso restringido y backups diarios.</li>
              <li>
                Servidores en proveedores de confianza (Vercel, Supabase).
              </li>
              <li>
                Monitoreo de accesos y alertas ante actividad sospechosa.
              </li>
            </ul>

            <h2>8. Tus derechos</h2>
            <p>Segun la ley peruana, tienes derecho a:</p>
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
              Para ejercer estos derechos, escribenos a{" "}
              <a href="mailto:privacidad@pedily.com">privacidad@pedily.com</a>.
              Respondemos en maximo 15 dias.
            </p>

            <h2>9. Cookies y tecnologias similares</h2>
            <p>Usamos cookies para:</p>
            <ul>
              <li>Mantener tu sesion iniciada.</li>
              <li>Recordar tus preferencias.</li>
              <li>
                Analizar como se usa la plataforma (con Vercel Analytics).
              </li>
            </ul>
            <p>
              Puedes desactivar cookies en tu navegador, pero algunas funciones
              podrian no funcionar correctamente.
            </p>

            <h2>10. Cambios en esta politica</h2>
            <p>
              Si hacemos cambios importantes, te avisaremos por email con al
              menos 15 dias de anticipacion. Los cambios menores se publican
              directamente aqui.
            </p>

            <h2>11. Contacto</h2>
            <p>
              Dudas sobre privacidad? Escribenos a{" "}
              <a href="mailto:privacidad@pedily.com">privacidad@pedily.com</a>.
              Estamos para ayudarte.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
