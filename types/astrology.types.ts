/**
 * Astrology Types
 * 
 * Type definitions for astrology-related functionality.
 * Includes chart types, planet data, aspects, and calculation results.
 * 
 * @module types/astrology.types
 */

/**
 * Zodiac signs
 */
export type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

/**
 * Planet names
 */
export type Planet =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'north_node'
  | 'south_node'
  | 'lilith';

/**
 * House numbers (1-12)
 */
export type House = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Aspect types
 */
export type AspectType =
  | 'conjunction'
  | 'opposition'
  | 'trine'
  | 'square'
  | 'sextile'
  | 'quincunx'
  | 'semisextile';

/**
 * Element types
 */
export type ElementType = 'fire' | 'earth' | 'air' | 'water';

/**
 * Modality types
 */
export type ModalityType = 'cardinal' | 'fixed' | 'mutable';

/**
 * Chart type
 */
export type ChartType = 'tropical' | 'draconic' | 'horary' | 'crossed';

/**
 * Planet position
 */
export interface PlanetPosition {
  name: Planet;
  sign: ZodiacSign;
  degree: number;
  minute: number;
  second?: number;
  house?: House;
  retrograde: boolean;
}

/**
 * Aspect between two planets
 */
export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  degree: number;
  orb: number;
  applying: boolean;
}

/**
 * House cusp position
 */
export interface HouseCusp {
  house: House;
  sign: ZodiacSign;
  degree: number;
  minute: number;
}

/**
 * Natal chart data
 */
export interface NatalChart {
  type: ChartType;
  birthDate: Date;
  birthTime?: string;
  birthPlace: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  planets: PlanetPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  ascendant?: ZodiacSign;
  midheaven?: ZodiacSign;
}

/**
 * Draconic chart data
 */
export interface DraconicChart extends NatalChart {
  type: 'draconic';
  northNodePosition: PlanetPosition;
}

/**
 * Horary chart data
 */
export interface HoraryChart extends NatalChart {
  type: 'horary';
  question: string;
  questionDate: Date;
}

/**
 * Crossed chart data (synastry)
 */
export interface CrossedChart {
  chart1: NatalChart;
  chart2: NatalChart;
  synastryAspects: Aspect[];
  compositeChart?: NatalChart;
}

/**
 * Chart interpretation
 */
export interface ChartInterpretation {
  chartType: ChartType;
  summary: string;
  personality: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  detailedAnalysis?: Record<string, string>;
}

/**
 * Lunar calendar data
 */
export interface LunarCalendar {
  date: Date;
  moonPhase: string;
  moonSign: ZodiacSign;
  illumination: number;
  nextFullMoon?: Date;
  nextNewMoon?: Date;
  recommendations?: string[];
}

/**
 * Personal calendar data
 */
export interface PersonalCalendar {
  date: Date;
  transits: PlanetPosition[];
  aspects: Aspect[];
  lunarPhase: string;
  recommendations?: string[];
}

/**
 * Astrogematria calculation
 */
export interface AstrogematriaCalculation {
  name: string;
  birthDate: Date;
  nameNumber: number;
  birthDateNumber: number;
  destinyNumber: number;
  lifePathNumber: number;
  interpretation: string;
  remedies?: string[];
}

/**
 * Elective chart search criteria
 */
export interface ElectiveChartCriteria {
  startDate: Date;
  endDate: Date;
  desiredAspects?: Aspect[];
  desiredPlanetPositions?: Partial<PlanetPosition>[];
  avoidAspects?: Aspect[];
  location?: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

/**
 * Elective chart result
 */
export interface ElectiveChartResult {
  date: Date;
  score: number;
  chart: NatalChart;
  matchedCriteria: string[];
  unmatchedCriteria: string[];
}

/**
 * Elective chart progress
 */
export interface ElectiveChartProgress {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  results?: ElectiveChartResult[];
  error?: string;
}

/**
 * Chart calculation request
 */
export interface ChartCalculationRequest {
  type: ChartType;
  birthDate: string;
  birthTime?: string;
  birthPlace: {
    city: string;
    country: string;
  };
}

/**
 * Chart calculation response
 */
export interface ChartCalculationResponse {
  success: boolean;
  chart?: NatalChart;
  error?: string;
}

/**
 * Zodiac sign information
 */
export interface ZodiacSignInfo {
  name: ZodiacSign;
  element: ElementType;
  modality: ModalityType;
  ruler: Planet;
  dates: string;
  traits: string[];
}

/**
 * Planet information
 */
export interface PlanetInfo {
  name: Planet;
  symbol: string;
  type: 'personal' | 'social' | 'transpersonal';
  rulingSigns: ZodiacSign[];
  meaning: string;
}
