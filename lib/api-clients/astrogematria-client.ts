import { AstrogematriaClient } from './astrogematria';
import { getApiUrl } from '@/lib/api-config';

export const getAstrogematriaClient = () => {
    return new AstrogematriaClient({
        BASE: getApiUrl('ASTROGEMATRIA'),
    });
};
