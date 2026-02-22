import type { features } from '@/lib/features';
import type { Entitlements } from '@/lib/subscription';

export const BETA_MODE_ENABLED = true;

/**
 * Emails de usuarios con acceso beta.
 * Estos usuarios ignoran las env vars de feature flags y el estado de suscripción.
 */
export const BETA_USERS: string[] = [
  'test@admin.com',
  'marianabonfanti53@gmail.com',
  'tarotarcanosentuvida@gmail.com',
  'tativid@gmail.com',
  'mariateresaholguinreyes@gmail.com',
  'joqui.astral@gmail.com',
  'mariaespanasanchez@gmail.com',
  'carolaaleman@gmail.com',
  'lsmnvll@gmail.com',
  'saglomacon@yahoo.com.mx',
  'irmaschubert2010@gmail.com',
  'begoadomnguez@yahoo.es',
  'aliriocruzcabrera@gmail.com',
  'jannette.fatima@gmail.com',
  'helder_009@hotmail.com',
  'cursacupunturaana@gmail.com',
  'holatemiro@gmail.com',
  'e_flores8212@yahoo.com',
  'eolortegui@msn.com',
  'sanchezhdzb@gmail.com',
  'contrapunto.ruiz@gmail.com',
  'espe_234@hotmail.com',
  'lizette.asencios@gmail.com',
  'elenaelosegui@gmail.com',
  'blucia9696@gmail.com',
  'rubenglillo@gmail.com',
  'armoonik@yahoo.es',
  'leandro.esposito@gmail.com',
  'ptrianaj@gmail.com',
  'laabridarolli@gmail.com',
  'ax.bonilla@gmail.com',
  'anasalce@yahoo.com',
  'ghermila@yahoo.com',
  'vero_125@hotmail.com',
  'dtalleda@gmail.com',
  'pia@costantini.com',
  'paqui.cantarero@gmail.com',
  'libelulacj@gmail.com',
  'africarocap@gmail.com',
  'aliciapertusi@gmail.com',
  'adryxpedroza@icloud.com',
  'gracielagaviglio@gmail.com',
  'klaus.pec70@yahoo.com.mx',
  'jorgexalberto@gmail.com',
  'malu_rodovalho68@hotmail.com',
  'juradomarcela56@gmail.com',
  'caminodetuser@gmail.com',
  'juliomatag@gmail.com',
  'vcamilor@gmail.com',
  'horn.erika@gmail.com',
  'angeles_onate@yahoo.com.mx',
  'maytemoar@gmail.com',
  'venuscotes@gmail.com',
  'sigrid.happle@gmail.com',
  'moritzani@gmail.com',
  'pilar-manso@hotmail.com',
  'mesidahmed@gmail.com',
  'marielacatalan9@gmail.com',
  'luisabazi.com@gmail.com',
  'kcarcurcursos@gmail.com',
  'elsama333@gmail.com',
  'katyvelasquez@gmail.com',
  'uezastrid@gmail.com',
  'andreinacanton@gmail.com',
  'amapimo3@gmail.com',
  'maribel2012@gmail.com',
  'tatocao76@gmail.com',
];

/**
 * Features visibles en el menú para beta users.
 * Solo estas claves de lib/features.ts serán visibles, independientemente de NEXT_PUBLIC_ENABLE_*.
 */
export const BETA_FEATURE_FLAGS: Array<keyof typeof features> = [
  'enablePersonalCalendar',
  'enableTropicalChart',
];

/**
 * Entitlements de acceso para beta users.
 * Solo estos entitlements de lib/subscription.ts estarán permitidos, sin requerir suscripción activa.
 */
export const BETA_ENTITLEMENTS: Array<keyof Entitlements> = [
  'hasBaseBundle',
];
