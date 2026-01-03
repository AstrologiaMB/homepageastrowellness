import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LegalPage() {
    return (
        <div className="min-h-screen py-10 px-6 bg-slate-50 flex justify-center">
            <Card className="max-w-3xl w-full shadow-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-slate-800">
                        Términos y Condiciones y Política de Privacidad
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none space-y-6">
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-600">
                                <p><strong>Aplicación:</strong> Astrochat</p>
                                <p><strong>Operada por:</strong> Astrologia MB LLC</p>
                                <p><strong>Última actualización:</strong> 03 de Enero de 2026</p>
                            </div>

                            <p>
                                Bienvenido a Astrochat. Estos Términos y Condiciones ("Términos") rigen el uso de nuestra aplicación móvil y sitio web. Al crear una cuenta o utilizar Astrochat, usted acepta estar legalmente vinculado por este contrato con Astrologia MB LLC, una compañía de responsabilidad limitada constituida en el estado de Florida, Estados Unidos.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">PARTE I: TÉRMINOS Y CONDICIONES DEL SERVICIO</h2>

                            <h3 className="text-xl font-semibold text-slate-700">1. DESCRIPCIÓN DEL SERVICIO</h3>
                            <p>Astrochat ofrece servicios de interpretación astrológica utilizando algoritmos avanzados de inteligencia artificial basados en la metodología de la astróloga María Blaquier.</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Modalidad Gratuita:</strong> Acceso limitado a funciones básicas.</li>
                                <li><strong>Modalidad de Pago:</strong> Acceso a reportes profundos, cartas dracónicas y herramientas avanzadas.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">2. REQUISITOS DE USO</h3>
                            <p>Usted declara tener al menos 18 años de edad (o la mayoría de edad en su jurisdicción) para utilizar Astrochat. El servicio está disponible a nivel mundial, pero es operado desde los Estados Unidos.</p>

                            <h3 className="text-xl font-semibold text-slate-700">3. CUENTAS Y SEGURIDAD</h3>
                            <p>Usted es responsable de la seguridad de sus credenciales de acceso. Astrologia MB LLC se reserva el derecho de suspender, restringir o eliminar su cuenta en cualquier momento, a nuestra entera discreción, sin previo aviso y sin responsabilidad alguna, si consideramos que ha violado estos Términos o si el modelo de negocio así lo requiere.</p>

                            <h3 className="text-xl font-semibold text-slate-700">4. CONTENIDO DEL USUARIO Y ALMACENAMIENTO ("LA AGENDA")</h3>
                            <p>Astrochat permite a los usuarios guardar notas, reflexiones y registros personales ("Contenido de Usuario") a modo de agenda personal. Respecto a esta funcionalidad, usted comprende y acepta que:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>No hay garantía de perpetuidad:</strong> Astrochat NO es un servicio de almacenamiento en la nube (backup). La información se guarda para su conveniencia mientras el servicio esté activo.</li>
                                <li><strong>Riesgo de pérdida:</strong> Usted asume el riesgo total de pérdida de su información. Astrologia MB LLC no será responsable por la desaparición de sus notas debido a:
                                    <ul className="list-circle pl-5 mt-1 space-y-1 text-slate-600">
                                        <li>Migraciones de tecnología o bases de datos.</li>
                                        <li>Actualizaciones de la aplicación.</li>
                                        <li>Cese de operaciones o cambios en el modelo de negocio.</li>
                                        <li>Fallos técnicos o ataques cibernéticos.</li>
                                    </ul>
                                </li>
                                <li><strong>Recomendación:</strong> No utilice Astrochat para almacenar información crítica, única o irrecuperable.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">5. PAGOS Y REEMBOLSOS</h3>
                            <p>Los precios se muestran en la moneda correspondiente a su tienda de aplicaciones o en Dólares Estadounidenses (USD).</p>
                            <p>Al tratarse de bienes digitales de consumo inmediato (interpretaciones generadas), <strong>todas las ventas son finales</strong>. No ofrecemos reembolsos salvo que la ley aplicable lo exija obligatoriamente.</p>

                            <h3 className="text-xl font-semibold text-slate-700">6. PROPIEDAD INTELECTUAL</h3>
                            <p>Todo el contenido, algoritmos, textos interpretativos y marcas son propiedad exclusiva de Astrologia MB LLC. Se le otorga una licencia limitada para uso personal y no comercial. Está prohibida la reventa o distribución masiva de los reportes.</p>

                            <h3 className="text-xl font-semibold text-slate-700">7. DESCARGO DE RESPONSABILIDAD (DISCLAIMER)</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Naturaleza del Servicio:</strong> Las interpretaciones son generadas por Inteligencia Artificial entrenada con contenido de autor. Aunque buscamos la máxima fidelidad, el servicio puede contener imprecisiones.</li>
                                <li><strong>Fines de Entretenimiento:</strong> El servicio se ofrece con fines educativos, de autoconocimiento y entretenimiento. No sustituye el consejo profesional médico, legal o financiero, ni la consulta con un astrólogo profesional en vivo.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">8. LEY APLICABLE Y JURISDICCIÓN</h3>
                            <p>Estos Términos se rigen por las leyes del Estado de Florida, Estados Unidos. Cualquier disputa legal que surja en relación con este servicio se resolverá exclusivamente en los tribunales estatales o federales ubicados en el Condado de Miami-Dade, Florida.</p>
                        </section>

                        <section className="space-y-4 pt-4 border-t-2 border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">PARTE II: POLÍTICA DE PRIVACIDAD</h2>
                            <p className="font-medium text-slate-600">En Astrologia MB LLC, valoramos su privacidad. Esta sección explica cómo manejamos su información.</p>

                            <h3 className="text-xl font-semibold text-slate-700">1. DATOS QUE RECOPILAMOS</h3>
                            <p>Para brindarle nuestros servicios, recopilamos:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Datos de Nacimiento:</strong> Fecha, hora exacta y ciudad de nacimiento. Estos datos son estrictamente necesarios para el cálculo matemático de su carta astral.</li>
                                <li><strong>Datos de Cuenta:</strong> Nombre, dirección de correo electrónico y contraseña (cifrada).</li>
                                <li><strong>Datos de Uso:</strong> Información técnica sobre su dispositivo y cómo interactúa con la app para mejorar el servicio.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">2. USO DE LA INFORMACIÓN</h3>
                            <p>Utilizamos sus datos exclusivamente para:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Calcular y generar sus interpretaciones astrológicas personalizadas.</li>
                                <li>Gestionar su acceso y autenticación en la app.</li>
                                <li>Procesar pagos (a través de procesadores seguros como Stripe, Apple o Google; nosotros no almacenamos datos completos de tarjetas de crédito).</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">3. COMPROMISO DE NO VENTA DE DATOS</h3>
                            <p>Astrologia MB LLC <strong>NO vende, alquila ni comercializa</strong> su información personal ni sus datos de nacimiento a terceros. Su información no se utiliza para publicidad dirigida de terceros ni se transfiere a corredores de datos (data brokers).</p>

                            <h3 className="text-xl font-semibold text-slate-700">4. COMPARTIR DATOS CON PROVEEDORES DE SERVICIOS</h3>
                            <p>Solo compartimos datos estrictamente necesarios con proveedores tecnológicos que nos ayudan a operar la app, bajo obligaciones de confidencialidad:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Proveedores de IA:</strong> Utilizamos servicios de Inteligencia Artificial (como Anthropic u OpenAI) para procesar el texto de su interpretación. Los datos se envían de forma anónima o segura para la generación del reporte.</li>
                                <li><strong>Alojamiento:</strong> Servicios en la nube (como AWS o Fly.io) donde se alojan nuestros servidores seguros.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">5. ALMACENAMIENTO Y TRANSFERENCIA INTERNACIONAL</h3>
                            <p>Sus datos son procesados y almacenados en servidores ubicados en los Estados Unidos. Si usted reside fuera de EE.UU. (ej: Unión Europea), al usar Astrochat acepta la transferencia de sus datos a esta jurisdicción.</p>

                            <h3 className="text-xl font-semibold text-slate-700">6. DERECHOS DEL USUARIO (GDPR / CCPA)</h3>
                            <p>Independientemente de dónde viva, le otorgamos los siguientes derechos:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Acceso y Corrección:</strong> Puede ver y editar sus datos de nacimiento en la app.</li>
                                <li><strong>Eliminación (Derecho al Olvido):</strong> Puede solicitar la eliminación total de su cuenta y sus datos de nuestros servidores escribiendo a nuestro correo de contacto.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-700">7. CONTACTO</h3>
                            <p>Para cualquier duda legal, de privacidad o solicitud de baja de datos, puede contactarnos en:</p>
                            <div className="bg-slate-50 p-4 rounded border border-slate-200 mt-2">
                                <p><strong>Astrologia MB LLC</strong></p>
                                <p>16200 NW 59th Ave, Suite 104</p>
                                <p>Miami Lakes, FL 33014, USA</p>
                                <p>Correo electrónico: <a href="mailto:info@mariablaquier.com" className="text-primary hover:underline">info@mariablaquier.com</a></p>
                            </div>
                        </section>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
