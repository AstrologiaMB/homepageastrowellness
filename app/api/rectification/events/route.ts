import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

export async function POST(req: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener el usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verificar que el usuario haya aceptado la incertidumbre
    if (!user.rectificationAcceptedUncertainty) {
      return NextResponse.json(
        {
          error: 'Debes aceptar la incertidumbre de 2 horas primero',
        },
        { status: 400 }
      );
    }

    // Obtener datos del cuerpo de la solicitud
    const { events } = await req.json();

    // Validar que se hayan enviado 4 eventos (2 tristes y 2 alegres)
    if (!events || !Array.isArray(events) || events.length !== 4) {
      return NextResponse.json(
        {
          error: 'Debes proporcionar exactamente 4 eventos',
        },
        { status: 400 }
      );
    }

    const sadEvents = events.filter((event) => event.eventType === 'sad');
    const happyEvents = events.filter((event) => event.eventType === 'happy');

    if (sadEvents.length !== 2 || happyEvents.length !== 2) {
      return NextResponse.json(
        {
          error: 'Debes proporcionar 2 eventos tristes y 2 eventos alegres',
        },
        { status: 400 }
      );
    }

    // Eliminar eventos anteriores si existen
    await prisma.rectificationEvent.deleteMany({
      where: { userId: user.id },
    });

    // Crear los nuevos eventos
    const createdEvents = await Promise.all(
      events.map((event) =>
        prisma.rectificationEvent.create({
          data: {
            userId: user.id,
            eventType: event.eventType,
            description: event.description,
            eventDate: new Date(event.eventDate),
            notes: event.notes || null,
          },
        })
      )
    );

    // Actualizar el estado de la rectificación
    await prisma.user.update({
      where: { id: user.id },
      data: {
        rectificationStatus: 'in_progress',
      },
    });

    // Enviar notificaciones por email incluyendo los eventos
    try {
      // Formatear eventos para el email
      const sadEventsList = createdEvents
        .filter(e => e.eventType === 'sad')
        .map(e => `<li><strong>${new Date(e.eventDate).toLocaleDateString()}:</strong> ${e.description}${e.notes ? ` <em>(${e.notes})</em>` : ''}</li>`)
        .join('');

      const happyEventsList = createdEvents
        .filter(e => e.eventType === 'happy')
        .map(e => `<li><strong>${new Date(e.eventDate).toLocaleDateString()}:</strong> ${e.description}${e.notes ? ` <em>(${e.notes})</em>` : ''}</li>`)
        .join('');

      const emailHtml = `
        <h2>Nueva Solicitud de Rectificación (Completa)</h2>
        <p><strong>Usuario:</strong> ${user.name || 'Sin nombre'} (${user.email})</p>
        <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Estado:</strong> ${user.rectificationStatus === 'in_progress' ? 'En progreso (Eventos recibidos)' : user.rectificationStatus}</p>
        <br/>
        
        <h3>Datos de Nacimiento Actuales:</h3>
        <ul>
          <li><strong>Fecha:</strong> ${user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'No definida'}</li>
          <li><strong>Hora:</strong> ${user.birthHour}:${user.birthMinute?.toString().padStart(2, '0') || '00'}</li>
          <li><strong>Lugar:</strong> ${user.birthCity}, ${user.birthCountry}</li>
        </ul>
        <br/>
        
        <h3>Eventos de Vida Reportados:</h3>
        
        <h4>💔 Eventos Tristes:</h4>
        <ul>${sadEventsList}</ul>
        
        <h4>❤️ Eventos Alegres:</h4>
        <ul>${happyEventsList}</ul>
        
        <br/>
        <p>El usuario ha aceptado la incertidumbre y completado el formulario de eventos.</p>
      `;

      // 1. Email al Administrador
      await sendEmail({
        to: 'cursos@mariablaquier.com, majaspe@hotmail.com',
        subject: `[Astrochat] Solicitud de Rectificación COMPLETA - ${session.user.email}`,
        html: emailHtml,
      });

      // 2. Email de Confirmación al Usuario
      if (session.user.email) {
        await sendEmail({
          to: session.user.email,
          subject: 'Solicitud de Rectificación recibida - Astrochat',
          html: `
            <h2>Solicitud Recibida Exitosamente</h2>
            <p>Hola,</p>
            <p>Confirmamos que hemos recibido tu solicitud de rectificación junto con los eventos de vida reportados.</p>
            <p>El equipo de María Blaquier analizará tu caso. Si la rectificación es viable con la información proporcionada, te contactaremos con los pasos para el pago y el inicio del proceso.</p>
            <br/>
            <p><em>El equipo de Astrochat</em></p>
          `,
        });
      }
    } catch (emailError) {
      console.error('Error enviando emails de rectificación:', emailError);
      // No fallamos la request si falla el email, pero lo logueamos
    }

    return NextResponse.json({
      success: true,
      events: createdEvents,
    });
  } catch (error) {
    console.error('Error al guardar eventos de rectificación:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener el usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        rectificationEvents: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      events: user.rectificationEvents,
      status: user.rectificationStatus,
    });
  } catch (error) {
    console.error('Error al obtener eventos de rectificación:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
