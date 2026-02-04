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

export const isFeatureEnabled = (featureKey: keyof typeof features) => {
    if (features.enableAllFeatures) return true;
    return features[featureKey] || false;
};
