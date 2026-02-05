import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Terminos y Condiciones | Pedily",
  description: "Terminos y condiciones de uso de la plataforma Pedily.",
};

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Terminos y Condiciones
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Ultima actualizacion: Febrero 2026
          </p>

          <div className="prose prose-slate mt-10 max-w-none">
            <p>
              Bienvenido a Pedily. Al usar nuestra plataforma, aceptas estos
              terminos. Leelos con calma, estan escritos para que se entiendan.
            </p>

            <h2>1. Que es Pedily</h2>
            <p>
              Pedily es una plataforma SaaS (Software as a Service) que permite
              a negocios de comida recibir pedidos a traves de multiples
              canales: tienda web, bot de WhatsApp y kiosko de autoservicio.
              Pedily es operado por Hub de Innovacion Digital SAC, con domicilio
              en Lima, Peru.
            </p>

            <h2>2. Cuentas de usuario</h2>
            <p>
              Para usar Pedily necesitas crear una cuenta. Tu eres responsable
              de mantener tu contrasena segura y de todo lo que pase en tu
              cuenta. Si sospechas que alguien accedio sin permiso, avisanos de
              inmediato.
            </p>

            <h2>3. Planes y pagos</h2>
            <p>
              Ofrecemos diferentes planes con distintas funcionalidades. Los
              precios estan publicados en nuestra web y pueden cambiar con aviso
              previo de 30 dias. El pago es por adelantado, mensual o anual
              segun elijas.
            </p>
            <ul>
              <li>
                Los pagos se procesan a traves de pasarelas seguras (Culqi,
                IZIPAY).
              </li>
              <li>
                Si no pagas, tu cuenta puede ser suspendida hasta regularizar.
              </li>
              <li>
                No hay reembolsos por meses no usados, salvo casos especiales.
              </li>
            </ul>

            <h2>4. Uso aceptable</h2>
            <p>Te comprometes a:</p>
            <ul>
              <li>Usar Pedily solo para fines legales.</li>
              <li>No vender productos prohibidos o regulados sin permiso.</li>
              <li>Mantener la informacion de tu negocio actualizada.</li>
              <li>No intentar hackear, sobrecargar o danar la plataforma.</li>
              <li>
                No usar el bot de WhatsApp para spam o mensajes no solicitados.
              </li>
            </ul>

            <h2>5. Contenido y datos</h2>
            <p>
              Tu mantienes la propiedad de todo el contenido que subes (fotos,
              descripciones, precios). Nos das permiso para mostrarlo en tu
              tienda y procesarlo para que el sistema funcione.
            </p>
            <p>
              Los datos de tus clientes son tuyos. Nosotros solo los procesamos
              para que puedas gestionar tus pedidos. Consulta nuestra Politica
              de Privacidad para mas detalles.
            </p>

            <h2>6. Disponibilidad del servicio</h2>
            <p>
              Hacemos todo lo posible para que Pedily funcione 24/7, pero no
              podemos garantizar disponibilidad perfecta. Puede haber
              mantenimientos programados o caidas inesperadas. Te avisaremos
              cuando sea posible.
            </p>

            <h2>7. Integraciones de terceros</h2>
            <p>
              Pedily se integra con servicios de terceros como Culqi, IZIPAY,
              WhatsApp (Meta), Nubefact y PedidosYa. Cada uno tiene sus propios
              terminos que debes aceptar. No somos responsables de fallas o
              cambios en estos servicios externos.
            </p>

            <h2>8. Limitacion de responsabilidad</h2>
            <p>
              Pedily es una herramienta para gestionar pedidos. No somos
              responsables de:
            </p>
            <ul>
              <li>La calidad de los productos que vendes.</li>
              <li>Problemas de delivery o repartidores.</li>
              <li>Disputas entre tu y tus clientes.</li>
              <li>
                Perdidas economicas por caidas del servicio o errores en el
                sistema.
              </li>
            </ul>

            <h2>9. Cancelacion</h2>
            <p>
              Puedes cancelar tu cuenta cuando quieras desde el panel de
              administracion. Al cancelar:
            </p>
            <ul>
              <li>Tu tienda dejara de estar disponible.</li>
              <li>
                Tendras 30 dias para exportar tus datos antes de ser eliminados.
              </li>
              <li>Los pagos ya realizados no son reembolsables.</li>
            </ul>
            <p>
              Nosotros tambien podemos cancelar tu cuenta si violas estos
              terminos, con aviso previo salvo casos graves.
            </p>

            <h2>10. Cambios en los terminos</h2>
            <p>
              Podemos actualizar estos terminos. Te avisaremos por email con al
              menos 15 dias de anticipacion. Si sigues usando Pedily despues del
              cambio, significa que aceptas los nuevos terminos.
            </p>

            <h2>11. Ley aplicable</h2>
            <p>
              Estos terminos se rigen por las leyes de Peru. Cualquier disputa
              se resolvera en los tribunales de Lima.
            </p>

            <h2>12. Contacto</h2>
            <p>
              Si tienes dudas sobre estos terminos, escribenos a{" "}
              <a href="mailto:legal@pedily.com">legal@pedily.com</a>.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
