import { AstroInterpreterClient } from './astro-interpreter';
import { getApiUrl } from '@/lib/api-config';

export const getAstroInterpreterClient = () => {
    return new AstroInterpreterClient({
        BASE: getApiUrl('INTERPRETACIONES'),
    });
};

export type {
    InterpretacionRequest,
    InterpretacionResponse,
    InterpretacionItem,
    EventoCalendario,
    InterpretacionEventoRequest,
    InterpretacionEventosResponse,
    EventoInterpretado
} from './astro-interpreter';
