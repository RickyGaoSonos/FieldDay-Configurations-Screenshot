//
// This function is no longer used; we've kept it as a reference configFun.
//
// function removeSamurai(values) {
//  values.collateralDefinition += ' NS';
//  values.collateralDefinition = values.collateralDefinition.trim();
//}
//

var QuickConfig = {

  fixtureConfigs: [

    {
      name: 'RTF-AIO',
      displayName: 'AIO',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Play1,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: ''
              },
            },
          ],
        },
        {
          name: 'No Touchscreen',
          playerConfigs: [
            {
              name: 'Play1,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: 'LT'
              },
            },
            {
              name: 'SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
                collateralDefinition: 'LT'
              },
            },
          ],
        },
        {
          name: 'Simple Demo',
          playerConfigs: [
            {
              name: 'Play5',
              values: {
                ExRModel: 'SBDAIO',
                SpeakerModel: 'AIO.5',
                collateralDefinition: 'LT'
              },
            },
          ],
        },
      ],
    },
    {
      name: 'RTF-HT',
      displayName: 'HT',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Playbase,Beam,Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: ''
              }
            },
            {
              name: 'Playbar,Beam,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.ERU',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbase,Playbar',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SR',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbase,Beam',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SE',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbar,Beam',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.ER',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbase,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SU',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: ''
              },
            },
            {
              name: 'Beam,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.EU',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: ''
              },
            },
            {
              name: 'Beam',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.E',
                collateralDefinition: ''
              },
            },
          ],
        },
        {
          name: 'Yes, with TV',
          playerConfigs: [
            {
              name: 'Playbase,Beam,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: ''
              }
            },
            {
              name: 'Playbase,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SRU',
                collateralDefinition: ''
              },
            },
          ],
        },
        {
          name: 'No Touchscreen',
          playerConfigs: [
            {
              name: 'Beam',
              values: {
                ExRModel: 'HT.E',
                SpeakerModel: 'HT.E',
                collateralDefinition: 'LT'
              },
            },
          ],
        },
        {
          name: 'Simple Demo',
          playerConfigs: [
            {
              name: 'Playbase,Sub',
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.SU',
                collateralDefinition: ''
              }
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: ''
              }
            },
            {
              name: 'Playbase',
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.S',
                collateralDefinition: ''
              }
            },
            {
              name: 'Playbar',
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.R',
                collateralDefinition: ''
              }
            },
            {
              name: 'Beam',
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.E',
                collateralDefinition: ''
              }
            },
          ],
        },
      ],
    },
    {
      name: 'US Additional',
      displayName: 'Additional Forms',
      displayConfigs: [
        { name: 'No Touchscreen',
          playerConfigs: [
            {
              name: 'Playbar,Sub,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.RU5O',
                collateralDefinition: 'LT NRS'
              },
            },
          ],
        },
      ],
    },
  ],

  languageConfigs: {
    'RTF': { 'RTF-AIO': true, 'RTF-HT': true },
    'US-RTF': { 'RTF-AIO': true, 'RTF-HT': true, 'US Additional': true },
  },

  videoExclusions: [
    { type: 'all',       name: 'Use all videos',      default: true,            collateralDefinition: '' },
    { type: 'noSamurai', name: 'Remove Samurai',                                collateralDefinition: 'NS' },
    { type: 'fsk-6',     name: 'Remove Samurai, Big Lebowski, and Pacific Rim', collateralDefinition: 'NF' },
  ],

  languages: [
    { locale: 'zh-CN', label: 'Chinese',             config: 'RTF' },
    { locale: 'da',    label: 'Danish',              config: 'RTF' },
    { locale: 'nl',    label: 'Dutch',               config: 'RTF' },
    { locale: 'en-AU', label: 'English Australia',   config: 'RTF' },
    { locale: 'en-BX', label: 'English Benelux',     config: 'RTF' },
    { locale: 'en-CA', label: 'English Canada',      config: 'RTF' },
    { locale: 'en-GB', label: 'English UK/Britain',  config: 'RTF' },
    { locale: 'en-US', label: 'English US',          config: 'US-RTF' },
    { locale: 'fr',    label: 'French',              config: 'RTF' },
    { locale: 'fr-BX', label: 'French Benelux',      config: 'RTF' },
    { locale: 'fr-CA', label: 'French Canada',       config: 'RTF' },
    { locale: 'fr-CH', label: 'French Switzerland',  config: 'RTF' },
    { locale: 'de',    label: 'German',              config: 'RTF' },
    { locale: 'de-CH', label: 'German Switzerland',  config: 'RTF' },
    { locale: 'it',    label: 'Italian',             config: 'RTF' },
    { locale: 'it-CH', label: 'Italian Switzerland', config: 'RTF' },
    { locale: 'no',    label: 'Norwegian',           config: 'RTF' },
    { locale: 'es',    label: 'Spanish',             config: 'RTF' },
    { locale: 'es-MX', label: 'Spanish Mexico',      config: 'RTF' },
    { locale: 'se',    label: 'Swedish',             config: 'RTF' },
  ],
};
