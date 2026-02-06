export const features = {
    // Calendario
    enablePersonalCalendar: process.env.NEXT_PUBLIC_ENABLE_PERSONAL_CALENDAR === 'true',
    enableLunarCalendar: process.env.NEXT_PUBLIC_ENABLE_LUNAR_CALENDAR === 'true', // Planificador Lunar

    // Cartas
    enableTropicalChart: process.env.NEXT_PUBLIC_ENABLE_TROPICAL_CHART === 'true',
    enableDraconicChart: process.env.NEXT_PUBLIC_ENABLE_DRACONIC_CHART === 'true',

    // Buenos Momentos / Electional
    enableElectional: process.env.NEXT_PUBLIC_ENABLE_ELECTIONAL === 'true',

    // Astrogematria
    enableAstrogematria: process.env.NEXT_PUBLIC_ENABLE_ASTROGEMATRIA === 'true',

    // Debug/Dev
    enableAllFeatures: process.env.NEXT_PUBLIC_ENABLE_ALL_FEATURES === 'true',
};

// Email del administrador autorizado para ver features ocultos
const ADMIN_EMAIL = 'info@astrochat.online';

export const isFeatureEnabled = (featureKey: keyof typeof features, userEmail?: string | null) => {
    // 1. Si el flag global de dev está activo, todo activo
    if (process.env.NODE_ENV === 'development') return true;
    if (features.enableAllFeatures) return true;

    // 2. Si el feature está oficialmente activo, activo
    if (features[featureKey]) return true;

    // 3. BYPASS: Si es el calendario personal Y es el admin, activo
    if (featureKey === 'enablePersonalCalendar' && userEmail === ADMIN_EMAIL) {
        return true;
    }

    return false;
};
