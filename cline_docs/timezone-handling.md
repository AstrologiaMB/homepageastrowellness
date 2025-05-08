# Manejo de Zonas Horarias en Astrowellness

## Implementación Actual

Actualmente, Astrowellness maneja las zonas horarias de la siguiente manera:

1. **Almacenamiento de datos**: Todos los eventos astrológicos se almacenan en formato UTC en el archivo JSON de datos.

2. **Conversión a hora local**: La conversión de UTC a hora local se realiza automáticamente en el cliente utilizando el objeto `Date` nativo de JavaScript:

   ```javascript
   // En components/evento-astrologico.tsx
   const horaLocal = new Date(`${evento.fecha_utc}T${evento.hora_utc}:00Z`);
   const horaFormateada = `${horaLocal.getHours().toString().padStart(2, '0')}:${horaLocal.getMinutes().toString().padStart(2, '0')}`;
   ```

3. **Visualización**: La hora convertida se muestra junto con el tipo de evento:

   ```jsx
   <div className="font-semibold">{evento.tipo_evento} a las {horaFormateada}</div>
   ```

### Ventajas del Enfoque Actual

- **Simplicidad**: No requiere bibliotecas adicionales ni configuración compleja.
- **Adaptación automática**: Se ajusta automáticamente a la zona horaria del dispositivo del usuario.
- **Soporte para horario de verano**: Maneja automáticamente los cambios de horario de verano/invierno.

## Limitaciones Conocidas

El enfoque actual tiene algunas limitaciones importantes:

1. **Dependencia del dispositivo**: La conversión depende de que el dispositivo del usuario tenga configurada correctamente su zona horaria.

2. **Cambio de horas al viajar**: Si un usuario viaja a otra zona horaria y su dispositivo actualiza automáticamente la configuración, las horas mostradas cambiarán. Por ejemplo:
   - Un evento que ocurre a las 15:00 UTC se mostrará a las 12:00 en Buenos Aires (UTC-3)
   - El mismo evento se mostrará a las 17:00 si el usuario viaja a Madrid (UTC+2)

3. **Falta de control manual**: Los usuarios no pueden seleccionar manualmente una zona horaria diferente a la de su dispositivo.

## Mejora Propuesta para el Futuro

Para un manejo más robusto de zonas horarias, se propone la siguiente mejora:

1. **Almacenamiento de preferencia de usuario**:
   - Añadir un campo `timezone` en el perfil del usuario
   - Permitir al usuario seleccionar su zona horaria preferida

2. **Interfaz de selección**:
   - Implementar un selector de zona horaria en la configuración del usuario
   - Mostrar la zona horaria actual y permitir cambiarla

3. **Uso de bibliotecas especializadas**:
   - Integrar `date-fns-tz` o `luxon` para un manejo más robusto de zonas horarias
   - Ejemplo con date-fns-tz:
     ```javascript
     import { formatInTimeZone } from 'date-fns-tz';
     
     // Usando la zona horaria del usuario desde su perfil
     const horaFormateada = formatInTimeZone(
       new Date(`${evento.fecha_utc}T${evento.hora_utc}:00Z`),
       userTimezone, // Por ejemplo: 'America/Argentina/Buenos_Aires'
       'HH:mm'
     );
     ```

4. **Indicador de zona horaria**:
   - Mostrar la zona horaria actual en la interfaz
   - Proporcionar información sobre cómo cambiarla

### Beneficios de la Mejora

- **Consistencia**: Los usuarios verán los eventos en su zona horaria preferida, independientemente de dónde se encuentren físicamente.
- **Control de usuario**: Los usuarios pueden elegir ver los eventos en cualquier zona horaria que prefieran.
- **Mejor experiencia para viajeros**: Útil para usuarios que viajan frecuentemente o consultan eventos desde diferentes ubicaciones.

Esta mejora se implementará en futuras versiones de Astrowellness para proporcionar una experiencia más personalizada y consistente a los usuarios.
