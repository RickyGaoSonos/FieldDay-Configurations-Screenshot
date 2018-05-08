"use strict";

var Query = document.location.search.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this;}.bind({}))[0];

var host;
//host = 'http://10.96.1.2:8008/GetUserVars'; // Debug

var Debug = false;

// Simple Demo Config:
var IsSimpleDemo;
var HarnessButtonCount;
var GroupNames = ['language', 'fixture', 'display', 'player', 'exclusion'];
var CurrentGroup = 0;
var UserVars;

var BrightSignMessageExchange;
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
  setTimeout(function() { efficientGetUserVars(doUserVars, host); }, timeout);
}

$(document).ready(function() {
  if (IsRunningOnBrightSign) setTimeout(initializeBrightSignCommunications, 250);
  doGetConfigVars(2000);
});

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
  UserVars = us;

  if (typeof us === 'undefined')
  {
    console.log("userVars not defined");
    doGetConfigVars(1000);
    return;
  }

  IsSimpleDemo = (IsRunningOnBrightSign && us.simpleDemoButtonSetup === 'true');
  IsSimpleDemo = (IsSimpleDemo || Query.simple === 'true');
  const quick = (Query.setup === 'Quick' || Query.setup === 'Local' ||
                 us.ExRModel === '' && Query.setup !== 'Full');

  if (!IsSimpleDemo) {
    displayQRData(us, quick);
  } else {
    $('#QRCodes').hide();
  }

  if (IsSimpleDemo) {
    buildQueryForButtonHarness('#quickConfigContainer');
    $('#longConfig, #wait').html('');
  } else if (quick) {
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
                <td rowspan="3">&nbsp;&nbsp;&nbsp;</td>
                <td id="fixture" width="20%""></td>
                <td>&nbsp;</td>
                <td id="display" width="30%"></td>
                <td rowspan="3">&nbsp;</td>
                <td id="player" width="35%" rowspan="3"></td>
            </tr>
            <tr height="100%" rowspan="2">
                <td id="exclusion-list" colspan="3" style="display:none;">
                    <div>
                        <b>Video Exclusions:</b><br>
                        <div id="exclusion">
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

function buildQueryForButtonHarness(jqSelector) {
  $(jqSelector).html(`
    <div id="buttonSelect">
        <h2>
            Please push the "Learn More" button so that<br>
            we can determine which style button harness<br>
            is on this display.
        </h2>
        <h3>
            Note: During setup, you will use the following buttons:<br><br>
            <table>
              <tr>
               <td>Vol -/+</td><td>&nbsp;</td><td>Move down/up the current option list</td>
             </tr>
             <tr>
               <td>Music</td><td>&nbsp;</td><td>Select previous option list</td>
             </tr>
             <tr>
               <td>Video</td><td>&nbsp;</td><td>Select next option list</td>
             </tr>
             <tr>
               <td>Learn</td><td>&nbsp;</td><td>Save Values and Reboot</td>
             </tr>
        </h3>
    </div>
  `);
  $(jqSelector).on('click', function() {
    HarnessButtonCount = 6; // Arbitrary - this is used for testing only
    $(jqSelector).off('click');
    setTimeout(function() { quickConfig(UserVars); }, 50);
  });
  // We have nothing more to do - when the user presses the next button, we'll continue
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
  $('#exclusion').html(html);

  $('#quickConfig').on('change', 'input', onChangeQuickConfig);

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
  highlightCurrentGroup();
}

var LastLanguage;
var LastFixture;
var LastDisplay;

function onChangeQuickConfig() {
  let changed = false;
  const $language = $('input[name=language]:checked');
  if (LastLanguage != $language.val()) {
    LastLanguage = $language.val();
    changed = true;

    $('#fixture').html('');
    $('#display').html('');
    $('#player').html('');
    LastFixture = undefined;
    LastDisplay = undefined;
    const langConfig = QuickConfig.languages[+LastLanguage].config;
    const langConfigs = QuickConfig.languageConfigs[langConfig];
    let okCnt = 0;
    for (const name in QuickConfig.fixtureConfigs) {
      const config = QuickConfig.fixtureConfigs[name];
      const simpleDemo = config.displayConfigs && config.displayConfigs['Simple Demo'];
      config.isOK = (langConfigs[name] &&
                     !(IsSimpleDemo && (!simpleDemo || !simpleDemo.simpleDemoButtonCounts ||
                                        !simpleDemo.simpleDemoButtonCounts[HarnessButtonCount])));
      if (config.isOK) okCnt++;
    }
    let br = '';
    const checked = okCnt > 1 ? '' : ' checked="checked"';
    for (const name in QuickConfig.fixtureConfigs) {
      const config = QuickConfig.fixtureConfigs[name];
      if (!langConfigs[name]) continue;
      if (!config.isOK) continue;
      const fixtureName = config.displayName;
      const quickName = fixtureName.replace(/[, ]/g, '');
      const html = `<input type="radio" name="fixture" value="${name}" id="${quickName}"` +
            `${checked}><label for="${quickName}">${fixtureName}</label>`;
      $('#fixture').append(br + html);
      br = '<br>';
    }
  }

  const $fixture = $('input[name=fixture]:checked');
  if (LastFixture != $fixture.val()) {
    LastFixture = $fixture.val();
    changed = true;

    $('#display').html('');
    $('#player').html('');
    LastDisplay = undefined;
    let br = '';
    const configs = QuickConfig.fixtureConfigs[LastFixture].displayConfigs;
    let okCnt = 0;
    for (const name in configs) {
      const config = configs[name];
      config.quickName = name.replace(/[, ]/g, '');
      config.isOK = (!IsSimpleDemo || name === 'Simple Demo');
      if (config.isOK) okCnt++;
    }
    const checked = okCnt > 1 ? '' : ' checked="checked"';
    for (const name in configs) {
      const config = configs[name];
      const displayName = name;
      const quickName = config.quickName;
      if (!config.isOK) continue;
      const html = `<input type="radio" name="display" value="${name}" id="${quickName}"` +
            `${checked}>` +
            `<label for="${quickName}">${displayName}</label>`;
      $('#display').append(br + html);
      br = '<br>';
    }
    const enableExclusions = $fixture.attr('id') === 'HT' && !IsSimpleDemo;
    if ($('#exclusion').html() != '') $('#exclusion-list').toggle(enableExclusions);
  }

  const $display = $('input[name=display]:checked');
  if (LastDisplay != $display.val()) {
    LastDisplay = $display.val();
    changed = true;

    $('#player').html('');
    let br = '';
    const configs = QuickConfig.fixtureConfigs[LastFixture]
                               .displayConfigs[LastDisplay]
                               .playerConfigs;
    let okCnt = 0;
    for (const name in configs) {
      const config = configs[name];
      config.quickName = name.replace(/[, ]/g, '');
      config.isOK = (!IsSimpleDemo || !config.values ||
                     config.values.simpleDemoButtonCount == HarnessButtonCount);
      if (config.isOK) okCnt++;
    }
    const checked = okCnt > 1 ? '' : ' checked="checked"';
    for (const name in configs) {
      const config = configs[name];
      const playerName = name;
      const quickName = playerName.replace(/[, ]/g, '');
      if (!config.isOK) continue;
      const html = `<input type="radio" name="player" value="${name}" id="${quickName}"` +
            `${checked}>` +
            `<label for="${quickName}">${playerName}</label>`;
      $('#player').append(br + html);
      br = '<br>';
    }
  }

  const $player = $('input[name=player]:checked');

  $('#quickSubmit').prop('disabled',
                         !($fixture.length &&
                           $display.length &&
                           $player.length &&
                           $language.length));
}

function highlightCurrentGroup() {
  if (!IsSimpleDemo) return;
  $('.simpleDemoSelected').removeClass('simpleDemoSelected');
  $(`#${GroupNames[CurrentGroup]}`).addClass('simpleDemoSelected');
}

//
// Initialize BrightSign communications
//

function initializeBrightSignCommunications() {
  BrightSignMessageExchange = new BSMessagePort();
  BrightSignMessageExchange.onbsmessage = processBrightSignMessage;
}

function processBrightSignMessage(msg) {
  const data = msg.data;
  if (!data) {
    console.log("Malformed data received from BrightSign");
    return;
  }
  const message = data.sendMessage || data.sendmessage;
  if (Debug) console.log(`Got JS Message: ${message}`);
  switch (message) {
    // Simple Demo Buttons
    case 'displayButton':
      processSimpleDemoButton(data.buttonName, data.buttonAction);
      break;

    default:
      console.log("==========> Unhandled message: ");
      console.log(JSON.stringify(data, null, 2));
  }
}

var ButtonMap = {
  '5': {
    'GPIO0' : 'LEARN',
    'GPIO1' : 'VIDEO',
    'GPIO2' : 'VOL_UP',
    'GPIO5' : 'MUSIC',
    'GPIO6' : 'VOL_DOWN',
  },
  '6': {
    'GPIO0' : 'SUB',
    'GPIO1' : 'LEARN',
    'GPIO2' : 'VOL_UP',
    'GPIO4' : 'VIDEO',
    'GPIO5' : 'MUSIC',
    'GPIO6' : 'VOL_DOWN',
  },
};

function processSimpleDemoButton(buttonName, buttonAction) {
  if (!HarnessButtonCount) {
    switch (buttonName) {
    case 'GPIO0':
      HarnessButtonCount = '5';
      break;
    case 'GPIO1':
      HarnessButtonCount = '6';
      break;
    }
    if (HarnessButtonCount) setTimeout(function() { quickConfig(UserVars); }, 50);
    return;
  }

  const xlatedButton = ButtonMap[HarnessButtonCount][buttonName];

  let $el, $all;
  switch (xlatedButton) {
  case 'MUSIC':
    $el = $(`input[name=${GroupNames[CurrentGroup]}]:checked`);
    if ($el.length) CurrentGroup < GroupNames.length - 1 && CurrentGroup++;
    highlightCurrentGroup();
    break;
  case 'VIDEO':
    CurrentGroup && CurrentGroup--;
    highlightCurrentGroup();
    break;
  case 'LEARN':
    if (!$('#quickSubmit').prop('disabled')) {
      $('#quickSubmit').click();
    }
  case 'SUB':
    highlightCurrentGroup();
    break;
  case 'VOL_UP':
    $all = $(`input[name=${GroupNames[CurrentGroup]}]`);
    $el = $(`input[name=${GroupNames[CurrentGroup]}]:checked`);
    if (!$el.length || $el.is($all.first())) {
      $el = $all.last();
    } else {
      $el = $el.prevAll(':radio:first');
    }
    $el.prop('checked', true);
    onChangeQuickConfig();
    break;
  case 'VOL_DOWN':
    $all = $(`input[name=${GroupNames[CurrentGroup]}]`);
    $el = $(`input[name=${GroupNames[CurrentGroup]}]:checked`);
    if (!$el.length || $el.is($all.last())) {
      $el = $all.first();
    } else {
      $el = $el.nextAll(':radio:first');
    }
    $el.prop('checked', true);
    onChangeQuickConfig();
    break;
  }
}

// We abstracted this out so that Ricky could easily reuse it.
function getSettings() {
  const fixture = $('input[name=fixture]:checked').val();
  const display = $('input[name=display]:checked').val();
  const player = $('input[name=player]:checked').val();
  const localeIdx = $('input[name=language]:checked').val();
  const exclusion = $('input[name=exclusion]:checked').val();
  const locale = QuickConfig.languages[localeIdx].locale;
  const settings = QuickConfig.fixtureConfigs[fixture]
                              .displayConfigs[display]
                              .playerConfigs[player];
  const type = settings.values.ExRModel.substr(0, 2);
  const sbdType = settings.values.ExRModel.slice(-2);
  if ((type === 'HT' && !IsSimpleDemo || sbdType === 'HT' && IsSimpleDemo) && exclusion) {
    const collat = ((settings.values.collateralDefinition || '') + ' ' + exclusion).trim();
    settings.values.collateralDefinition = collat;
  }
  const newSettings = Object.assign({}, QuickConfig.defaultValues,
                                    {locale: locale}, settings.values);
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
      case "desiredvideoresolution":
        desc="Video resolution (Careful: change only if needed)";
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
      case "desiredvideoresolution":
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
