const sakayData = {
  tomtomApiKey: '7RvNlZyh7bQuugRsNbIOcjBhlKYCOlwL',
  mapCenter: [14.5895, 120.9745],
  zoom: 16,
  fuelBaseline: {
    gasoline: 62.55,
    diesel: 56.74,
    lastUpdated: '2026-07-09',
    source: 'Zigwheels PH / DOE'
  },
  fare: {
    jeepneyTraditional: {
      label: 'Traditional Jeepney',
      icon: '🚌',
      baseFare: 14,
      baseKm: 4,
      perKm: 2,
      color: '#2563eb'
    },
    jeepneyModern: {
      label: 'Modern Jeepney',
      icon: '🚍',
      baseFare: 17,
      baseKm: 4,
      perKm: 2.30,
      color: '#1d4ed8'
    },
    tricycle: {
      label: 'Tricycle',
      icon: '🛺',
      flagdown: 16,
      flagKm: 1,
      perKm: 10,
      color: '#0ea5e9'
    }
  },
  terminals: [
    {
      id: 'mapua',
      name: 'Mapúa University',
      type: 'landmark',
      coords: [14.5891, 120.9748],
      description: 'Main campus along Muralla St, Intramuros',
      transport: ['tricycle', 'jeepney'],
      image: '',
      address: '658 Muralla St, Intramuros, Manila'
    },
    {
      id: 'intramuros-tricycle',
      name: 'Intramuros Tricycle Terminal',
      type: 'terminal',
      coords: [14.5880, 120.9765],
      description: 'Main tricycle terminal serving Intramuros area. Tricycles available for hire going to any point within Intramuros and nearby barangays.',
      transport: ['tricycle'],
      address: 'Muralla St, Intramuros, Manila',
      fareRange: { min: 16, max: 50 }
    },
    {
      id: 'lawton',
      name: 'Lawton Jeepney & Bus Terminal',
      type: 'terminal',
      coords: [14.5928, 120.9758],
      description: 'Major jeepney and bus terminal just outside Intramuros. Routes to Baclaran, Pier South, Divisoria, and more.',
      transport: ['jeepney', 'bus'],
      address: 'Lawton Ave, Manila',
      fareRange: { min: 14, max: 30 }
    },
    {
      id: 'pier15',
      name: 'Pier 15 Jeepney Terminal',
      type: 'terminal',
      coords: [14.5848, 120.9692],
      description: 'Jeepney terminal near South Harbor. Routes to various parts of Manila.',
      transport: ['jeepney'],
      address: 'Andres Soriano Jr. Ave, Manila',
      fareRange: { min: 14, max: 25 }
    },
    {
      id: 'letran',
      name: 'Colegio de San Juan de Letran',
      type: 'landmark',
      coords: [14.5922, 120.9782],
      description: 'Historic college along Muralla St, Intramuros',
      transport: ['tricycle', 'jeepney'],
      address: '151 Muralla St, Intramuros, Manila'
    },
    {
      id: 'san-luis',
      name: 'San Luis Complex',
      type: 'landmark',
      coords: [14.5878, 120.9732],
      description: 'Plaza San Luis Complex — heritage site with museums and shops',
      transport: ['tricycle'],
      address: 'General Luna St, Intramuros, Manila'
    },
    {
      id: 'fort-santiago',
      name: 'Fort Santiago',
      type: 'landmark',
      coords: [14.5948, 120.9705],
      description: 'Historic citadel and national shrine in Intramuros',
      transport: ['tricycle'],
      address: 'Fort Santiago, Intramuros, Manila'
    }
  ],
  routes: [],
  routePairs: [
    {
      id: 'pier15-to-mapua', startId: 'pier15', endId: 'mapua',
      name: 'Pier 15 → Mapúa University',
      coords: [[14.5848,120.9692],[14.5852,120.9698],[14.5860,120.9706],[14.5868,120.9718],[14.5875,120.9728],[14.5882,120.9738],[14.5888,120.9744],[14.5891,120.9748]],
      distance: 0.9, mode: 'tricycle', estTime: 3
    },
    {
      id: 'mapua-to-pier15', startId: 'mapua', endId: 'pier15',
      name: 'Mapúa University → Pier 15',
      coords: [[14.5891,120.9748],[14.5888,120.9744],[14.5882,120.9738],[14.5875,120.9728],[14.5868,120.9718],[14.5860,120.9706],[14.5852,120.9698],[14.5848,120.9692]],
      distance: 0.9, mode: 'tricycle', estTime: 3
    },
    {
      id: 'lawton-to-mapua', startId: 'lawton', endId: 'mapua',
      name: 'Lawton Terminal → Mapúa University',
      coords: [[14.5928,120.9758],[14.5920,120.9756],[14.5912,120.9755],[14.5904,120.9752],[14.5898,120.9750],[14.5891,120.9748]],
      distance: 0.5, mode: 'tricycle', estTime: 2
    },
    {
      id: 'mapua-to-lawton', startId: 'mapua', endId: 'lawton',
      name: 'Mapúa University → Lawton Terminal',
      coords: [[14.5891,120.9748],[14.5898,120.9750],[14.5904,120.9752],[14.5912,120.9755],[14.5920,120.9756],[14.5928,120.9758]],
      distance: 0.5, mode: 'tricycle', estTime: 2
    },
    {
      id: 'intramuros-trike-to-mapua', startId: 'intramuros-tricycle', endId: 'mapua',
      name: 'Intramuros Tricycle Terminal → Mapúa',
      coords: [[14.5880,120.9765],[14.5882,120.9760],[14.5885,120.9755],[14.5888,120.9750],[14.5891,120.9748]],
      distance: 0.3, mode: 'tricycle', estTime: 2
    },
    {
      id: 'mapua-to-letran', startId: 'mapua', endId: 'letran',
      name: 'Mapúa University → Letran College',
      coords: [[14.5891,120.9748],[14.5895,120.9755],[14.5900,120.9762],[14.5908,120.9770],[14.5915,120.9776],[14.5922,120.9782]],
      distance: 0.5, mode: 'tricycle', estTime: 2
    },
    {
      id: 'mapua-to-sanluis', startId: 'mapua', endId: 'san-luis',
      name: 'Mapúa University → San Luis Complex',
      coords: [[14.5891,120.9748],[14.5885,120.9742],[14.5880,120.9736],[14.5878,120.9732]],
      distance: 0.3, mode: 'tricycle', estTime: 1
    },
    {
      id: 'lawton-to-pier15', startId: 'lawton', endId: 'pier15',
      name: 'Lawton Terminal → Pier 15',
      coords: [[14.5928,120.9758],[14.5918,120.9748],[14.5908,120.9735],[14.5898,120.9722],[14.5885,120.9712],[14.5872,120.9702],[14.5860,120.9696],[14.5848,120.9692]],
      distance: 1.2, mode: 'jeepney-traditional', estTime: 4
    },
    {
      id: 'pier15-to-lawton', startId: 'pier15', endId: 'lawton',
      name: 'Pier 15 → Lawton Terminal',
      coords: [[14.5848,120.9692],[14.5860,120.9696],[14.5872,120.9702],[14.5885,120.9712],[14.5898,120.9722],[14.5908,120.9735],[14.5918,120.9748],[14.5928,120.9758]],
      distance: 1.2, mode: 'jeepney-traditional', estTime: 4
    }
  ],
  gaswatchApi: 'http://localhost:3000/api',
  version: '1.1.0',
  lastFareUpdate: 'March 19, 2026',
  fareSource: 'LTFRB Order 2026 (TopGear PH)',
  sources: [
    {
      id: 'ltfrb-jeepney',
      title: 'LTFRB Jeepney Fare Adjustment March 2026',
      publisher: 'TopGear PH',
      url: 'https://www.topgear.com.ph/news/motoring-news/ltfrb-approves-fare-adjustments-puvs-a2578-20260317',
      date: 'March 17, 2026',
      notes: 'Traditional: P14 first 4km + P2/km · Modern: P17 first 4km + P2.30/km'
    },
    {
      id: 'ltfrb-jeepney-2',
      title: 'LTFRB Approves Jeepney Fare Increase',
      publisher: 'BaguioCityGuide',
      url: 'https://baguiocityguide.com/ltfrb-approves-jeepney-fare-increase-starting-march-19-2026/',
      date: 'March 17, 2026',
      notes: 'Alternative source confirming same fare matrix'
    },
    {
      id: 'manila-tricycle',
      title: 'Manila LGU Tricycle Fare Matrix',
      publisher: 'Manila Bulletin',
      url: 'https://mb.com.ph/2023/11/6/manila-lgu-releases-new-fare-matrix-for-tri-wheels',
      date: 'November 6, 2023',
      notes: 'P16 first km + P5 per succeeding 500m (P10/km)'
    },
    {
      id: 'manila-tricycle-2',
      title: 'Manila Sets New P16 Tricycle Fare',
      publisher: 'Inquirer',
      url: 'https://newsinfo.inquirer.net/1856068/manila-sets-new-tricycle-pedicab-fare-of-p16-for-first-kilometer-of-trip',
      date: 'November 7, 2023',
      notes: 'Confirms P16 base fare + P5/500m'
    },
    {
      id: 'fuel-api',
      title: 'GasWatchPH API',
      publisher: 'GasWatchPH',
      url: 'https://gaswatchph.com',
      date: 'Live',
      notes: 'Community-reported + official gas station prices from GasWatchPH'
    },
    {
      id: 'fuel-baseline',
      title: 'Fuel Price Today Manila',
      publisher: 'Zigwheels PH',
      url: 'https://www.zigwheels.ph/fuel-price',
      date: 'July 9, 2026',
      notes: 'Gasoline P62.55/L · Diesel P56.74/L'
    }
  ]
};
