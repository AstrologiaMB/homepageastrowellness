import { CartaElectivaClient } from './carta-electiva';
import { getApiUrl } from '@/lib/api-config';

export const getCartaElectivaClient = () => {
    return new CartaElectivaClient({
        BASE: getApiUrl('CARTA_ELECTIVA'),
    });
};
