import { NatalChartClient } from './natal-chart';
import { getApiUrl } from '@/lib/api-config';

export const getNatalChartClient = () => {
    return new NatalChartClient({
        BASE: getApiUrl('CALCULOS'),
    });
};
