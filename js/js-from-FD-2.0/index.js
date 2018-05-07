"use strict";

var Query = document.location.search.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this;}.bind({}))[0];

var host;
//host = 'http://10.96.1.2:8008/GetUserVars'; // Debug

var IsRunningOnBrightSign = false;
if (typeof(CloseAllBSClasses) === 'function') {
  CloseAllBSClasses(true);
  IsRunningOnBrightSign = true;
}

function efficientGet(errorCallback, dataCallback, sUrl)
{
  $.ajax({
    url: sUrl,
    error: errorCallback,
    success: function(data,status,jqXHR) {
      dataCallback(jqXHR.responseText);
    },
  });
}

function efficientGetUserVars(callback, sUrl)
{
  sUrl = typeof sUrl !== 'undefined' ? sUrl : "/GetUserVars";
  efficientGet(callback, function(un) {
    const xmlDoc = $.parseXML(un);
    const $xml = $(xmlDoc);
    const varlist = {};
    $xml.find('BrightSignVar').each(function() {
      varlist[$(this).attr('name')] = $(this).text();
    });
    callback(varlist);
  }, sUrl);
}

function doGetConfigVars(timeout) {
  if (Query.setup === 'Local') {
    doUserVars({});
    return;
  }
  setTimeout(efficientGetUserVars(doUserVars, host), timeout);
}

window.onload = function() {
  doGetConfigVars(2000);
};

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function doReboot(button, delay) {
  button.innerText = 'Please wait...';
  button.disabled = true;
  $('#submit').prop('disabled', true);
  setTimeout(function() {
    window.location.href='/experience/events/interface/reboot';
  }, delay || 100);
  return false;
}

function doSubmit(event) {
  $('button').prop('disabled', true);
  setTimeout(function () {
    $('button').prop('disabled', false);
    $('form').submit();
  }, 200);
};

function doUserVars(us) {
  if (typeof us === 'undefined')
  {
    console.log("userVars not defined");
    doGetConfigVars(1000);
    return;
  }

  const quick = (Query.setup === 'Quick' || Query.setup === 'Local' ||
                 us.ExRModel === '' && Query.setup !== 'Full');

  displayQRData(us, quick);

  if (quick) {
    quickConfig(us);
  }
  else {
    normalConfig(us);

    if (IsRunningOnBrightSign) {
      $('input').keyboard({
        layout: 'custom',
        customLayout: {
          'normal': [
            '1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{sp:2} q w e r t y u i o p [ ] \\',
            '{sp:1} a s d f g h j k l ; \' {accept}',
            '{shift} z x c v b n m , . / ` {shift}',
            '{sp:11} {left} {space} {right} {sp:1} {del} {sp:7} {cancel}'
          ],
          'shift': [
            '! @ # $ % ^ & * ( ) _ + {bksp}',
            '{sp:2} Q W E R T Y U I O P { } |',
            '{sp:1} A S D F G H J K L : " {accept}',
            '{shift} Z X C V B N M < > ? ~ {shift}',
            '{sp:11} {left} {space} {right} {sp:1} {del} {sp:7} {cancel}'
          ]
        },
        keyBinding : 'touchstart',
        autoAccept: true,
        visible: function(e, keyboard, el) {
          const label = $(el).parent('td').prev().prev().html();
          const preview = `<span class"ui-keyboard-preview-label">${label}: &nbsp;</span>`;
          $('.ui-keyboard-preview-wrapper').prepend(preview);
        }
      });
    }
  }
}

function buildQuickConfigScaffolding(jqSelector) {
  $(jqSelector).html(`
                    <div id="quickConfig" style="display: none;">
                        <table style="width: 1230px;height: 636px;" class="quick">
                            <tr class="init">
                                <th>Language<!-- add for Locale: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Locale --></th>
                                <td>&nbsp;</td>
                                <th>Fixture</th>
                                <td>&nbsp;</td>
                                <th>Touch Screen</th>
                                <td>&nbsp;</td>
                                <th>Players</th>
                            </tr>
                            <tr>
                                <td id="language" width="5%" rowspan="3"></td>
                                <td rowspan="3">&nbsp;</td>
                                <td id="fixture" width="30%""></td>
                                <td>&nbsp;</td>
                                <td id="display" width="20%"></td>
                                <td rowspan="3">&nbsp;</td>
                                <td id="players" width="25%" rowspan="3"></td>
                            </tr>
                            <tr height="100%" rowspan="2">
                                <td id="exclusion-list" colspan="3" style="display:none;">
                                    <div>
                                        <b>Video Exclusions:</b><br>
                                        <div id="exclusions">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <br>
                        <button type="submit" class="control" id="quickSubmit">Save Values and Reboot</button>
                    </div>
`);
}

function quickConfig(us) {
  buildQuickConfigScaffolding('#quickConfigContainer');
  $('#version').text(us.presentationversion || us.presentationVersion);
  $('#longConfig').html('');
  $('#wait').html('');
  $('#quickConfig').show();
  $('.varform').css('width', '100%');

  $('#quickSubmit').prop('disabled', true);

  const useLocale = false;
  let html = useLocale ? '<table class="lang">' : '';
  let idx = 0;
  for (const lang of QuickConfig.languages) {
    const inp = `<input type="radio" name="language" value="${idx++}" id="${lang.locale}">`;
    const loc = `<label for="${lang.locale}">${lang.locale}</label>`;
    const lab = `<label for="${lang.locale}">${lang.label}</label>`;
    if (useLocale) {
      html += `<tr><td>${inp} ${lab}</td></tr><td>${loc}</td>`;
    } else {
      html += `${inp} ${lab}<br>`;
    }
  }
  if (useLocale) html += '</table>';
  $('#language').html(html);

  html = '';
  for (const exclusion of QuickConfig.videoExclusions) {
    const collat = exclusion.collateralDefinition;
    const type = exclusion.type;
    const select = exclusion.default ? 'checked="checked"' : '';
    const inp = `<input type="radio" name="exclusion" value="${collat}" id="${type}" ${select}>`;
    const lab = `<label for="${type}">${exclusion.name}</label>`;
    html += `${inp} ${lab}<br>`;
  }
  $('#exclusions').html(html);

  let lastLanguage;
  let lastFixture;
  let lastDisplay;
  $('#quickConfig').on('change', 'input', function() {
    let changed = false;
    const $language = $('input[name=language]:checked');
    if (lastLanguage != $language.val()) {
      lastLanguage = $language.val();
      changed = true;

      $('#fixture').html('');
      $('#display').html('');
      $('#players').html('');
      lastFixture = undefined;
      lastDisplay = undefined;
      const langConfig = QuickConfig.languages[+lastLanguage].config;
      const langConfigs = QuickConfig.languageConfigs[langConfig];
      let count = 0;
      for (const config of QuickConfig.fixtureConfigs) {
        if (!langConfigs[config.name]) continue;
        count++;
      }
      let br = '';
      let idx = 0;
      const checked = count > 1 ? '' : ' checked="checked"';
      for (const config of QuickConfig.fixtureConfigs) {
        idx++;
        if (!langConfigs[config.name]) continue;
        const fixtureName = config.displayName;
        const quickName = fixtureName.replace(/[, ]/g, '');
        const html = `<input type="radio" name="fixture" value="${idx - 1}" id="${quickName}"` +
              `${checked}><label for="${quickName}">${fixtureName}</label>`;
        $('#fixture').append(br + html);
        br = '<br>';
      }
    }

    const $fixture = $('input[name=fixture]:checked');
    if (lastFixture != $fixture.val()) {
      lastFixture = $fixture.val();
      changed = true;

      $('#display').html('');
      $('#players').html('');
      lastDisplay = undefined;
      let br = '';
      let idx = 0;
      const configs = QuickConfig.fixtureConfigs[+lastFixture].displayConfigs;
      const checked = configs.length > 1 ? '' : ' checked="checked"';
      for (const config of configs) {
        const displayName = config.name;
        const quickName = displayName.replace(/[, ]/g, '');
        const html = `<input type="radio" name="display" value="${idx++}" id="${quickName}"` +
                            `${checked}>` +
              `<label for="${quickName}">${displayName}</label>`;
        $('#display').append(br + html);
        br = '<br>';
      }
      if ($('#exclusions').html() != '') $('#exclusion-list').toggle($fixture.attr('id') === 'HT');
    }

    const $display = $('input[name=display]:checked');
    if (lastDisplay != $display.val()) {
      lastDisplay = $display.val();
      changed = true;

      $('#players').html('');
      let br = '';
      let idx = 0;
      const configs = QuickConfig.fixtureConfigs[+lastFixture]
                                 .displayConfigs[+lastDisplay]
                                 .playerConfigs;
      const checked = configs.length > 1 ? '' : ' checked="checked"';
      for (const config of configs) {
        const playerName = config.name;
        const quickName = playerName.replace(/[, ]/g, '');
        const html = `<input type="radio" name="player" value="${idx++}" id="${quickName}"` +
                            `${checked}>` +
              `<label for="${quickName}">${playerName}</label>`;
        $('#players').append(br + html);
        br = '<br>';
      }
    }

    const $player = $('input[name=player]:checked');
    const lastPlayer = $player.val();
    if (lastFixture && lastDisplay && lastPlayer) {
      const settings = QuickConfig.fixtureConfigs[+lastFixture]
                                  .displayConfigs[+lastDisplay]
                                  .playerConfigs[+lastPlayer];
    }

    $('#quickSubmit').prop('disabled',
                           !($fixture.length &&
                             $display.length &&
                             $player.length &&
                             $language.length));
  });

  $('#quickSubmit').click(function() {
    const button = this;
    const settings = getSettings();
    if (QuickConfig.languages[settings.localeIdx].configFun) {
      QuickConfig.languages[settings.localeIdx].configFun(settings.newSettings);
    }
    if (Query.setup !== 'Local') {
      $.ajax({
        type: "POST",
        url: `/SetValues`,
        data: settings.newSettings,
      })
        .done(function(data, textStatus, jqXHR) {
          doReboot(button, 2000);
        })
        .fail(function(jqHXR, textStatus, errorThrown) {
          alert(`Failed: ${textStatus}`);
        });
    } else {
      localStorage.vars = JSON.stringify(settings.newSettings);
      localStorage.localSetup = true;
      window.location = '../Field%20Day%20-%20HTML/Field%20Day.html';
    }
  });
}

// We abstracted this out so that Ricky could easily reuse it.
function getSettings() {
  const fixture = $('input[name=fixture]:checked').val();
  const display = $('input[name=display]:checked').val();
  const player = $('input[name=player]:checked').val();
  const localeIdx = $('input[name=language]:checked').val();
  const exclusion = $('input[name=exclusion]:checked').val();
  const locale = QuickConfig.languages[localeIdx].locale;
  const settings = QuickConfig.fixtureConfigs[+fixture]
                              .displayConfigs[+display]
                              .playerConfigs[+player];
  const type = settings.values.ExRModel.substr(0, 2);
  if (type === 'HT' && exclusion) {
    settings.values.collateralDefinition += ' ' + exclusion;
    settings.values.collateralDefinition = settings.values.collateralDefinition.trim();
  }
  const newSettings = Object.assign({}, settings.values, {locale: locale});
  return { newSettings: newSettings, localeIdx: localeIdx, };
}

function normalConfig(us) {
  $('#version').text(us.presentationversion || us.presentationVersion);

  let str='<form id="vars" action="/SetValues" method="post"><table class="shell">';

  str += '<tr><td class="shellLabel">Required:</td><td><table class="edit">';
  for (const key in us) {
    const val = us[key];
    let desc; 
    switch (key.toLowerCase()) {
      case "nagiosserver":
        desc="Nagios Address";
        break;
      case "storecontrolserver":
        desc="Dashboard Address";
        break;
      case "exrmodel":
        desc="Experience (AIO, HT, or HT+TV)";
        break;
    } 
    if (desc)
      str += '<tr><td class="editDesc">'+desc+'</td><td width="25px">&nbsp;</td><td><input class="bs_input" type="text" name="'+key+'" value="'+htmlEscape(val)+'"/></td></tr>';
  }
  str += '</table></td></tr>';

  str += '<tr><td>&nbsp;</td></tr>';
  str += '<tr><td class="shellLabel">Optional:</td><td>(blank is default)</td></tr>';
  str += '<tr><td>&nbsp;</td></tr>';

  str += '<tr><td class="shellLabel">Experience Tuning:</td><td><table class="edit">';
  for (const key in us) {
    const val = us[key];
    let desc; 
    switch (key.toLowerCase()) {
      case "speakermodel":
        desc="Speaker Model";
        break;
      case "collateraldefinition":
        desc="Collateral";
        break;
      case "locale":
        desc="Locale (ISO 639-1, blank=en-US)";
        break;
    } 
    if (desc)
      str += '<tr><td class="editDesc">'+desc+'</td><td width="25px">&nbsp;</td><td><input class="bs_input" type="text" name="'+key+'" value="'+htmlEscape(val)+'"/></td></tr>';
  }
  str += '</table></td></tr>';

  str += '<tr><td class="shellLabel">Site:</td><td><table class="edit">';
  for (const key in us) {
    const val = us[key];
    let desc; 
    switch (key.toLowerCase()) {
      case "unitid1":
        desc="Unit ID 1";
        break;
      case "unitid2":
        desc="Unit ID 2";
        break;
    } 
    if (desc)
      str += '<tr><td class="editDesc">'+desc+'</td><td width="25px">&nbsp;</td><td><input class="bs_input" type="text" name="'+key+'" value="'+htmlEscape(val)+'"/></td></tr>';
  }
  str += '</table></td></tr>';

  str += '<tr><td class="shellLabel">Volumes:</td><td><table class="edit">';
  for (const key in us) {
    const val = us[key];
    let desc; 
    switch (key.toLowerCase()) {
      case "startingvolumesetting":
        desc="Starting Volume (low, medium, high, blank=default)";
        break;
      case "maxvolumesetting":
        desc="Maximum Volume (blank=default)";
        break;
    } 
    if (desc)
      str += '<tr><td class="editDesc">'+desc+'</td><td width="25px">&nbsp;</td><td><input class="bs_input" type="text" name="'+key+'" value="'+htmlEscape(val)+'"/></td></tr>';
  }
  str += '</table></td></tr>';

  str += '<tr><td class="shellLabel">Room Equalization:</td><td><table class="edit">';
  for (const key in us) {
    const val = us[key];
    let desc; 
    switch (key.toLowerCase()) {
      case "setgainsub":
        desc="Sub Gain (-15 to +15, blank=don't change)";
        break;
    } 
    if (desc)
      str += '<tr><td class="editDesc">'+desc+'</td><td width="25px">&nbsp;</td><td><input class="bs_input" type="text" name="'+key+'" value="'+htmlEscape(val)+'"/></td></tr>';
  }
  str += '</table></td></tr>';

  str += '<tr><td>&nbsp;</td></tr>';

  str += '<tr><td class="shellLabel">Misc:</td><td><table class="edit">';
  for (const key in us) {
    const val = us[key];
    let desc; 
    var fieldType = "text";
    switch (key.toLowerCase()) {
      case "rdmmode":
        desc="Retail Display Mode (yes/no)";
        break;
      case "debugprint":
        desc="Debugging control";
        break;
      case "runasdemo":
        desc="Run locally in \"no players\" demo mode (yes/no)";
        break;
      case "sessiontimeoutdefault":
        desc="Session timeout (seconds; blank=120 secs)";
        break;
    }
    if (desc)
      str += '<tr><td class="editDesc">'+desc+'</td><td width="25px">&nbsp;</td><td><input class="bs_input" type="'+fieldType+'" name="'+key+'" value="'+htmlEscape(val)+'"/></td></tr>';
  }
  str += '</table></td></tr>';

  str += '</table>';

  str += '<br/><br/><center>';
  str += '<button class="control" href="#" onclick="return doSubmit(this);">Save Values</button>&nbsp;&nbsp;&nbsp;';
  str += '<button class="control" href="#" onclick="return doReboot(this);">Reboot</button>';
  str += '</center></form>';
  $('div.varform').html(str);

  str ='<table id="valuetable" >';
  for (const key in us) {
    const val = us[key];

    switch (key.toLowerCase()) {
      case "nagiosserver":
      case "storecontrolserver":
      case "exrmodel":

      case "locale":
      case "speakermodel":
      case "collateraldefinition":

      case "unitid1":
      case "unitid2":

      case "startingvolumesetting":
      case "maxvolumesetting":

      case "setgainsub":

      case "rdmmode":
      case "debugprint":
      case "runasdemo":
      case "sessiontimeoutdefault":

      case "singleusepassword":

      break;

      default:
        str += '<tr><td>'+key+'</td><td>'+val+'</td></tr>';
        break;
    } 

  }
  str += '</table>';

  $('div.vardiv').html(str);
}
