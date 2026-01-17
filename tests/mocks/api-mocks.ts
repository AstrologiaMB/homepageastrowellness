/**
 * API mock data
 * Mock data for API responses
 */

/**
 * Mock user data
 */
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: new Date('2024-01-01'),
    image: null,
    role: 'USER',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    emailVerified: new Date('2024-01-02'),
    image: null,
    role: 'ADMIN',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

/**
 * Mock subscription data
 */
export const mockSubscriptions = [
  {
    id: '1',
    userId: '1',
    stripeCustomerId: 'cus_test_1',
    stripeSubscriptionId: 'sub_test_1',
    stripePriceId: 'price_premium',
    status: 'ACTIVE',
    currentPeriodEnd: new Date('2024-02-01'),
    cancelAtPeriodEnd: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    userId: '2',
    stripeCustomerId: 'cus_test_2',
    stripeSubscriptionId: 'sub_test_2',
    stripePriceId: 'price_pro',
    status: 'ACTIVE',
    currentPeriodEnd: new Date('2024-02-01'),
    cancelAtPeriodEnd: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock natal data
 */
export const mockNatalData = [
  {
    id: '1',
    userId: '1',
    birthDate: new Date('1990-01-01T12:00:00Z'),
    location: 'New York, NY',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock chart data
 */
export const mockCharts = {
  tropical: {
    id: '1',
    chartType: 'TROPICAL',
    chartData: {
      planets: [
        { name: 'Sun', sign: 'Capricorn', degree: 10.5, house: 1 },
        { name: 'Moon', sign: 'Pisces', degree: 15.2, house: 3 },
        { name: 'Mercury', sign: 'Capricorn', degree: 5.8, house: 1 },
        { name: 'Venus', sign: 'Scorpio', degree: 22.3, house: 11 },
        { name: 'Mars', sign: 'Aries', degree: 8.1, house: 4 },
      ],
      aspects: [
        { planet1: 'Sun', planet2: 'Moon', type: 'trine', degree: 120 },
        { planet1: 'Venus', planet2: 'Mars', type: 'square', degree: 90 },
      ],
      houses: [
        { number: 1, sign: 'Capricorn', cusp: 10.5 },
        { number: 2, sign: 'Aquarius', cusp: 15.2 },
        { number: 3, sign: 'Pisces', cusp: 20.8 },
      ],
    },
    interpretation: 'Your Sun in Capricorn indicates a strong sense of responsibility...',
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date('2024-02-01'),
  },
  draconic: {
    id: '2',
    chartType: 'DRACONIC',
    chartData: {
      planets: [
        { name: 'North Node', sign: 'Aries', degree: 0.0, house: 1 },
        { name: 'South Node', sign: 'Libra', degree: 0.0, house: 7 },
      ],
      aspects: [],
      houses: [],
    },
    interpretation: 'Your North Node in Aries suggests your soul\'s purpose...',
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date('2024-02-01'),
  },
};

/**
 * Mock calendar events
 */
export const mockCalendarEvents = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'transit',
    description: 'Sun enters Aquarius',
    planet: 'Sun',
    sign: 'Aquarius',
  },
  {
    id: '2',
    date: '2024-01-20',
    type: 'phase',
    description: 'Full Moon in Leo',
    phase: 'full',
    sign: 'Leo',
  },
  {
    id: '3',
    date: '2024-02-01',
    type: 'ingress',
    description: 'Mercury enters Pisces',
    planet: 'Mercury',
    sign: 'Pisces',
  },
];

/**
 * Mock astro-gematria data
 */
export const mockAstrogematria = {
  numbers: {
    lifePath: 5,
    expression: 3,
    soulUrge: 7,
    personality: 2,
    birthday: 1,
  },
  interpretation: 'Your Life Path number 5 indicates freedom, change, and adventure...',
  remedies: [
    {
      type: 'crystal',
      name: 'Amethyst',
      description: 'Enhances spiritual awareness and intuition',
    },
    {
      type: 'color',
      name: 'Blue',
      description: 'Promotes calmness and communication',
    },
    {
      type: 'metal',
      name: 'Copper',
      description: 'Enhances energy flow and vitality',
    },
  ],
};

/**
 * Mock API responses
 */
export const mockApiResponses = {
  login: {
    success: true,
    data: {
      user: mockUsers[0],
      session: {
        token: 'mock_jwt_token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    message: 'Login successful',
  },
  register: {
    success: true,
    data: {
      user: mockUsers[0],
    },
    message: 'Registration successful',
  },
  getUser: {
    success: true,
    data: mockUsers[0],
    message: 'User retrieved successfully',
  },
  getSubscription: {
    success: true,
    data: mockSubscriptions[0],
    message: 'Subscription retrieved successfully',
  },
  getChart: {
    success: true,
    data: mockCharts.tropical,
    message: 'Chart calculated successfully',
  },
  getCalendar: {
    success: true,
    data: {
      events: mockCalendarEvents,
    },
    message: 'Calendar retrieved successfully',
  },
  getAstrogematria: {
    success: true,
    data: mockAstrogematria,
    message: 'Astro-gematria calculated successfully',
  },
};

/**
 * Mock API errors
 */
export const mockApiErrors = {
  invalidCredentials: {
    success: false,
    error: {
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password',
    },
  },
  unauthorized: {
    success: false,
    error: {
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    },
  },
  forbidden: {
    success: false,
    error: {
      code: 'FORBIDDEN',
      message: 'Access forbidden',
    },
  },
  notFound: {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Resource not found',
    },
  },
  validationError: {
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input data',
      details: {
        email: 'Invalid email format',
        password: 'Password must be at least 8 characters',
      },
    },
  },
  internalError: {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An error occurred',
    },
  },
};
