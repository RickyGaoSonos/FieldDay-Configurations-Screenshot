/* ========================================
 *
 * Copyright Sonos, 2018
 * All Rights Reserved
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF Sonos.
 *
 * ========================================
**/

//
// This function is no longer used; we've kept it as a reference configFun.
//
// function removeSamurai(values) {
//  values.collateralDefinition += ' NS';
//  values.collateralDefinition = values.collateralDefinition.trim();
//}
//

var QuickConfig = {

  defaultValues: {
    collateralDefinition: '',
    simpleDemoButtonCount: '',
  },

  fixtureConfigs: {
    'RTF-AIO' : {
      displayName: 'AIO',
      displayConfigs: {
        'Yes' : {
          playerConfigs: {
            'Play1,Play5,SonosOne' : {
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
              },
            },
            'SonosOne' : {
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
              },
            },
          },
        },
        'No Touchscreen' : {
          playerConfigs: {
            'Play1,Play5,SonosOne' : {
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: 'LT',
              },
            },
          },
        },
        'Simple Demo' : {
          simpleDemoButtonCounts: { '5' : true },
          playerConfigs: {
            'Play1' : {
              values: {
                ExRModel: 'SBDAIO',
                SpeakerModel: 'AIO.1',
                simpleDemoButtonCount: '5',
              },
            },
            'Play5' : {
              values: {
                ExRModel: 'SBDAIO',
                SpeakerModel: 'AIO.5',
                simpleDemoButtonCount: '5',
              },
            },
          },
        },
      },
    },
    'RTF-HT' : {
      displayName: 'HT',
      displayConfigs: {
        'Yes' : {
          playerConfigs: {
            'Playbase,Beam,Playbar,Sub' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SERU',
              },
            },
            'Playbar,Beam,Sub' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.ERU',
              },
            },
            'Playbase,Playbar' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SR',
              },
            },
            'Playbase,Beam' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SE',
              },
            },
            'Playbar,Beam' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.ER',
              },
            },
            'Playbase,Sub' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SU',
              },
            },
            'Playbar,Sub' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
              },
            },
            'Beam,Sub' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.EU',
              },
            },
            'Playbase' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
              },
            },
            'Beam' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.E',
              },
            },
          },
        },
        'Yes, with TV' : {
          playerConfigs: {
            'Playbase,Beam,Playbar,Sub' : {
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
              },
            },
            'Playbase,Playbar,Sub' : {
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SRU',
              },
            },
            'Playbase,Beam,Sub' : {
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SEU',
              },
            },
          },
        },
        'No Touchscreen' : {
          playerConfigs: {
            'Beam' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.E',
                collateralDefinition: 'LT',
              },
            },
          },
        },
        'Simple Demo' : {
          simpleDemoButtonCounts: { '5' : true, '6' : true },
          playerConfigs: {
            'Playbase,Sub' : {
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.SU',
                simpleDemoButtonCount: '6',
              },
            },
            'Playbar,Sub' : {
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.RU',
                simpleDemoButtonCount: '6',
              },
            },
            'Playbase' : {
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.S',
                simpleDemoButtonCount: '5',
              }
            },
            'Playbar' : {
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.R',
                simpleDemoButtonCount: '5',
              },
            },
            'Beam' : {
              values: {
                ExRModel: 'SBDHT',
                SpeakerModel: 'HT.E',
                simpleDemoButtonCount: '5',
              }
            },
          },
        },
      },
    },
    'US Additional' : {
      displayName: 'Additional Forms',
      displayConfigs: {
        'Yes' : {
          playerConfigs: {
            'Beam,SonosOne' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.EO',
                collateralDefinition: 'HTAIO',
              },
            },
          },
        },
        'No Touchscreen' : {
          playerConfigs: {
            'Playbar,Sub,Play5,SonosOne' : {
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.RU5O',
                collateralDefinition: 'LT NRS',
              },
            },
            'Beam,Sub,Play5,SonosOne' : {
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.EU5O',
                collateralDefinition: 'LT NRS',
              },
            },
            'Beam,SonosOne' : {
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.EO',
                collateralDefinition: 'HTAIO LT NSO',
              },
            },
          },
        },
      },
    },
  },

  languageConfigs: {
    'RTF': { 'RTF-AIO': true, 'RTF-HT': true },
    'US-RTF': { 'RTF-AIO': true, 'RTF-HT': true, 'US Additional': true },
  },

  videoExclusions: [
    { type: 'all',       name: 'Use all videos',  default: true, collateralDefinition: '' },
    { type: 'noSamurai', name: 'Remove Samurai',                 collateralDefinition: 'NS' },
    { type: 'fsk-6',     name: 'Remove Samurai and Pacific Rim', collateralDefinition: 'NF' },
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
