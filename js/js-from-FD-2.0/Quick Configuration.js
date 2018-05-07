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
/*
 * FD 1.8 - Update for FD 2.0 RTF:
 *
    {
      name: 'White Fixture, with Play3',
      displayName: 'White Fixture, with Play3',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Play1,Play3,Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.135',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.5',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: 'SD'
              },
            },
          ],
        },
      ],
    },
    {
      name: 'US White Fixture, no Play3',
      displayName: 'White Fixture, no Play3',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Play1,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Play1,Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
            },
          ],
        },
      ],
    },
    {
      name: 'Voice-Leading White Fixture, no Play3',
      displayName: 'White Fixture, no Play3',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Play1,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Play1,Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SRU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
            },
          ],
        },
      ],
    },
    {
      name: 'New-Voice White Fixture, no Play3',
      displayName: 'White Fixture, no Play3',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Play1,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Play1,Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.5',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: 'SD'
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Wood Fixture',
      displayName: 'Wood Fixture',
      displayConfigs: [
        {
          name: 'Yes, no TV',
          playerConfigs: [
            {
              name: 'Play1,Play5,SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15O',
                collateralDefinition: ''
              },
            },
            {
              name: 'Play1,Play5',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.15',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
                collateralDefinition: 'SD'
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
          ],
        },
        {
          name: 'Yes, with TV',
          playerConfigs: [
            {
              name: 'Playbase,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SRU',
                collateralDefinition: ''
              },
            },
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
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
              name: 'Single SonosOne',
              values: {
                ExRModel: 'AIO',
                SpeakerModel: 'AIO.O',
                collateralDefinition: 'LT'
              },
            },
          ],
        },
      ],
 *
 *
 */
    {
      name: 'RTB-EMEA-AIO',
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
                collateralDefinition: 'SD'
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
          ],
        },
      ],
    },
    {
      name: 'RTB-EMEA-HT',
      displayName: 'HT',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
            },
            {
              name: 'Playbar,ElRey,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.REU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'ElRey,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.EU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,Playbar',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SR',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,ElRey',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SE',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single ElRey',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.E',
                collateralDefinition: 'SD'
              },
            },
          ],
        },
        {
          name: 'Yes, with TV',
          playerConfigs: [
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
            },
            {
              name: 'Playbase,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SRU',
                collateralDefinition: 'SD'
              },
            },
          ],
        },
        {
          name: 'No Touchscreen',
          playerConfigs: [
            {
              name: 'ElRey',
              values: {
                ExRModel: 'HT.E',
                SpeakerModel: 'HT.E',
                collateralDefinition: 'LT'
              },
            },
          ],
        },
      ],
    },

    {
      name: 'RTB-AMPAC-AIO',
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
                collateralDefinition: 'SD'
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
      ],
    },
    {
      name: 'RTB-AMPAC-HT',
      displayName: 'HT',
      displayConfigs: [
        {
          name: 'Yes',
          playerConfigs: [
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
            },
            {
              name: 'Playbar,ElRey,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.REU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbase,Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.SRU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Playbar,Sub',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.RU',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single Playbase',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.S',
                collateralDefinition: 'SD'
              },
            },
            {
              name: 'Single ElRey',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.E',
                collateralDefinition: 'SD'
              },
            },
          ],
        },
        {
          name: 'Yes, with TV',
          playerConfigs: [
            {
              name: 'Playbase,ElRey,Playbar,Sub',
              values: {
                ExRModel: 'HT+TV',
                SpeakerModel: 'HT.SERU',
                collateralDefinition: 'SD'
              }
            },
          ],
        },
        {
          name: 'No Touchscreen',
          playerConfigs: [
            {
              name: 'ElRey',
              values: {
                ExRModel: 'HT',
                SpeakerModel: 'HT.E',
                collateralDefinition: 'LT'
              },
            },
          ],
        },
      ],
    },
  ],

  languageConfigs: {
/*
 * FD 1.8 - Update for FD 2.0 RTF:
 *
    US: { 'US White Fixture, no Play3': true, 'Wood Fixture': true, },
    VoiceLeading: { 'Voice-Leading White Fixture, no Play3': true, 'Wood Fixture': true, },
    NewVoice: { 'White Fixture, with Play3': true, 'New-Voice White Fixture, no Play3': true, },
    VoiceReady: { 'White Fixture, with Play3': true, },

    NewVoiceWithWood: { 'White Fixture, with Play3': true, 'New-Voice White Fixture, no Play3': true, 'Wood Fixture': true, },
    VoiceReadyWithWood: { 'White Fixture, with Play3': true, 'Wood Fixture': true, },
    VoiceReadyWoodOnly: { 'Wood Fixture': true, },
 *
 *
 */
    'RTB-EMEA': { 'RTB-EMEA-AIO': true, 'RTB-EMEA-HT': true },
    'RTB-US': {'RTB-AMPAC-AIO': true, 'RTB-AMPAC-HT': true },
  },

  videoExclusions: [
/*
 * FD 1.8 - Update for FD 2.0 RTF:
 *
    { type: 'all',       name: 'Use all videos',      default: true,            collateralDefinition: '' },
    { type: 'noSamurai', name: 'Remove Samurai',                                collateralDefinition: 'NS' },
    { type: 'fsk-6',     name: 'Remove Samurai, Big Lebowski, and Pacific Rim', collateralDefinition: 'NF' },
 *
 *
 */
  ],

  languages: [
    { locale: 'en-GB', label: 'English UK/Britain', config: 'RTB-EMEA' },
    { locale: 'en-US', label: 'English US',         config: 'RTB-US' },
/*
 * FD 1.8 - Update for FD 2.0 RTF:
 *
    { locale: 'zh-CN', label: 'Chinese',            config: 'VoiceReady' },
    { locale: 'da',    label: 'Danish',             config: 'VoiceReady' },
    { locale: 'nl',    label: 'Dutch',              config: 'VoiceReady' },
    { locale: 'en-AU', label: 'English Australia',  config: 'VoiceReady' },
    { locale: 'en-CA', label: 'English Canada',     config: 'NewVoice' },
    { locale: 'en-GB', label: 'English UK/Britain', config: 'VoiceLeading' },
    { locale: 'en-US', label: 'English US',         config: 'US' },
    { locale: 'fr',    label: 'French',             config: 'NewVoiceWithWood' },
    { locale: 'fr-CA', label: 'French Canada',      config: 'VoiceReady' },
    { locale: 'de',    label: 'German',             config: 'VoiceLeading' },
    { locale: 'de-CH', label: 'German Switzerland', config: 'VoiceReadyWoodOnly' },
    { locale: 'it',    label: 'Italian',            config: 'VoiceReadyWithWood' },
    { locale: 'no',    label: 'Norwegian',          config: 'VoiceReady' },
    { locale: 'es',    label: 'Spanish',            config: 'VoiceReadyWithWood' },
    { locale: 'es-MX', label: 'Spanish Mexico',     config: 'VoiceReady' },
    { locale: 'se',    label: 'Swedish',            config: 'NewVoice' },
 *
 *
 */
  ],
};
