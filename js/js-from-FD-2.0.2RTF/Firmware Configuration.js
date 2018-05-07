FirmwareConfig = {
  releases: [
    'Factory',
    'DaftPunk',
    'Wilco',
    'WuTang',
    'Otis',
    'TT-FD',
    'MA',
  ],
  supportedHardware: {
    default: false,
    '1-8': true,
    '1-9': true,
    '1-13': true,
    '1-14': true,
    '1-20': true,
    '1-21': true,
    '1-23': true,
  },

  Factory: {
    '1-8': 'N/A',
    '1-9': 'N/A',
    '1-13': 'N/A',
    '1-14': '35.2-36210',
    '1-20': 'N/A',
    '1-21': '38.3-43180',
    '1-23': '40.4-47230',  // manufacturing-ElReyMfg
  },
  DaftPunk: {
    default: '32.11-31051',
    '1-14': 'N/A',
    '1-21': 'N/A',
    '1-23': 'N/A',
  },
  Wilco: {
    default: '34.7-36222',
    '1-14': 'N/A',
    '1-21': '38.2-42020',
    '1-23': 'N/A',
  },
  WuTang: {
    default: '34.16-37102',
    '1-14': 'N/A',
    '1-21': '38.3-42281',
    '1-23': 'N/A',
  },
  Otis: {
    default: '35.3-39010',
    '1-14': '35.3-40062',
    '1-21': '38.5-43170',
    '1-23': 'N/A',
  },
  'TT-FD': {
    default: '38.8-45110',
    '1-23': 'N/A',
  },
  'MA': {
    default: '43.3-51100',
  },
};
