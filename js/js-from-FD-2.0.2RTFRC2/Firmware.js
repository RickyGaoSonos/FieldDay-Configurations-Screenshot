"use strict";

//
// "Globals" (to this module at least)
//
let Query = document.location.search.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this;}.bind({}))[0];

let WebServer = 'http://localhost';
//WebServer = 'http://10.96.1.5';  // Debug
let WebRestUrl = ':8008/experience/events/interface/';
let OpIndex = 0;
let Timer;
let RDMSetup = (Query.setup === 'RDM');
let PlayerInfo = {};


if (typeof(CloseAllBSClasses) === 'function') {
  CloseAllBSClasses(true);
}

function getFromBrightSign(getUrl, successCallback, completeCallback, dataType) {
  console.log(WebServer ? 'Getting JSON from BrightSign:' : 'Skipping get:');
  console.log(getUrl);
  if (!WebServer) return;
  $.ajax({
    url: WebServer + WebRestUrl + getUrl,
    dataType: dataType || 'html',
    success: successCallback,
    error: (function(jqHXR, textStatus, errorThrown) {
      alert(`Get BrightSign vars failed: ${textStatus}`);
    }),
    complete: completeCallback,
  });
}

function getZPStatus(baseUrl) {
  $.ajax({
    url: baseUrl + '/status/zp',
    dataType: 'xml',
    success: addZPStatus,
    error: (function(jqHXR, textStatus, errorThrown) {
      alert(`getZPStatus Failed: ${textStatus}`);
    }),
  });
}

function addZPStatus(xml)  {
  const values = {};
  $(xml).children('zpsupportinfo').children('zpinfo').children().each(function(){
    const $this = $(this);
    const name = $this.prop('nodeName');
    const value = $this.text();
    values[name] = value;
  });
  const ip = values['IPAddress'];
  values.found = true;
  values.time = (new Date).getTime();
  if (ip) PlayerInfo[ip] = values;
}

function processTopology(data) {
  const cfg = FirmwareConfig;
  const $firmwareTable = $('#firmware');
  const time = (new Date).getTime();

  if (data.complete) $('#setup').hide();

  let row;
  let cols;
  if (!RDMSetup) {
    row = '<tr><th>Zone</th><th>IP<br>/HHID</th><th>Device</th><th>Hardware</th><th style="max-width:10em;">Current<br>Firmware</th>';
    cols = 5;
    for (let release in cfg.releases) {
      row += `<th>${cfg.releases[release]}</th>`;
      cols++;
    }
  } else {
    cols = 7;
    row = '<tr><th>Zone<br>/HHID</th><th>IP</th><th>Device</th><th style="max-width:10em;">Current<br>Firmware</th><th>RDM (mode)</th><th>DHCP Mac</th><th>Enable</th>';
  }
  row += '</tr>';
  $firmwareTable.html(row);

  for (let deviceName in data.devices) {
    const device = data.devices[deviceName];
    const model = device.modelnumber;
    const modelActual = device.modelactual;
    const index = device.modelindex;
    const swVersion = device.softwareversion;
    const hwVersion = device.hardwareversion;
    const zone = device.zone.toUpperCase();
    const hhid = device.hhid;
    const retailMode = (device.retailmode == 1 || device.retailmode == 3) &&
                       `Yes (${device.retailmode})`
                    || 'No';
    const ip = device.baseurl.replace('http://', '').replace(':1400', '');
    let cachedPlayerInfo = PlayerInfo[ip];
    let dhcpMac = 'searching...';
    if (cachedPlayerInfo && cachedPlayerInfo.found) {
      dhcpMac = cachedPlayerInfo.DHCPServerMac || 'not set';
    }
    if (cachedPlayerInfo && cachedPlayerInfo.time && time > cachedPlayerInfo.time + 10000) {
      cachedPlayerInfo = null;
    }
    if (!cachedPlayerInfo) {
      getZPStatus(device.baseurl);
      PlayerInfo[ip] = {time: time};
    }

    row = `<tr class="border"><td colspan="${cols}"></td></tr>`;
    if (!RDMSetup) {
      row += `<tr><td>${zone}</td><td>${ip}</td><td>${modelActual}</td>` +
                 `<td nowrap>${hwVersion}</td>` +
                 `<td style="max-width:10em;" rowspan="3" valign="top">${swVersion}</td>`;
      for (let relNo in cfg.releases) {
        const release = cfg.releases[relNo];
        const supported = cfg.supportedHardware[hwVersion] || cfg.supportedHardware.default;
        const version = supported ? (cfg[release][hwVersion] || cfg[release].default) : 'Unsupported';
        if (parseInt(version) > 0) {
          row += `<td nowrap><a class="upgrade" data-modelactual="${modelActual}" data-model="${model}" data-index="${index}" data-oldVersion="${swVersion}" data-newversion="${version}" href="#">${version}</a></td>`;
        } else {
          row += `<td>${version}</td>`;
        }
      }
    } else {
      row += `<tr><td>${zone}</td><td>${ip}</td><td>${modelActual}</td>` +
             `<td style="max-width:10em;" rowspan="3" valign="top">${swVersion}</td>` +
             `<td nowrap>${retailMode}</td><td nowrap>${dhcpMac}</td>`;
      row += `<td nowrap><a class="rdm-config" data-modelactual="${modelActual}" data-model="${model}" data-index="${index}" data-old-rdm="${retailMode}" href="#">RDM Config</a></td>`;

    }

    if (!RDMSetup) {
      row += `</tr><tr><td></td><td colspan="3">${hhid}</td></tr>`;
    } else {
      row += `</tr><tr><td colspan="3">${hhid}</td></tr>`;
    }
    $firmwareTable.append(row);
  }
  row = `<tr class="border"><td colspan="${cols}"></td></tr>`;
  $firmwareTable.append(row);
}

function getTopology() {
  getFromBrightSign('sonosData', function (data, textStatus, jqXHR) {
    processTopology(data);
  }, function(jqXHR, textStatus) {
    renewTopology();
  },'json');
}

function renewTopology() {
  clearTimeout(Timer);
  Timer = setTimeout(function() {
    getTopology();
  }, 2000);
}

function turnOffRDM() {
  $.ajax({
    type: "POST",
    url: `/SetValues`,
    data: {rdmmode: 'no'},
  }).done(function(data, textStatus, jqXHR) {
      $('#title').html($('#title').html() + '<br>(Display RDM now set to "no")');
    })
    .fail(function(jqHXR, textStatus, errorThrown) {
      alert(`Reset RDM Failed: ${textStatus}`);
    });
}

$( document ).ready(function() {
  if (RDMSetup) {
    $('#firmware-options').hide();
    $('.firmware').remove();
    $('#title').text('Enable Per-Player RDM Mode');
    turnOffRDM();
  } else {
    $('.rdm').remove();
  }

  getFromBrightSign('backDoor?command=sonos!sall!disableplayermanagement', function() {
    getTopology();
  });

  $('#firmware').on('click', '.upgrade', function() {
    const $this = $(this);
    $this.parents('tr').find('.upgrade').prop('disabled', true).addClass('disabled');

    const modelActual = $(this).data('modelactual');
    const model = $(this).data('model');
    const index = $(this).data('index');
    const oldVersion = $(this).data('oldversion');
    const newVersion = $(this).data('newversion');
    const hhid = $(this).data('hhid');
    const ip = $(this).data('ip');

    const statusRow = `<tr><td>${modelActual}</td><td>${model}:${index}</td>` +
                          `<td>${oldVersion}</td><td>${newVersion}</td>` +
                          `<td id="opRow${++OpIndex}"></td></tr>`;
    $('#operations').append(statusRow);

    const cmd = `sonos!${model}:${index}!software_upgrade!${newVersion}`;
    const url = `backDoor?command=${cmd}`;
    getFromBrightSign(url, function(index) {
      return function() {
        $(`#opRow${index}`).text('Submitted');
      };
    }(OpIndex));

    renewTopology();

    return false;
  });

  $('#firmware').on('click', '.rdm-config', function() {
    const $this = $(this);
    $this.prop('disabled', true).addClass('disabled');

    const modelActual = $(this).data('modelactual');
    const model = $(this).data('model');
    const index = $(this).data('index');
    const oldRdm = $(this).data('old-rdm');
    const hhid = $(this).data('hhid');
    const ip = $(this).data('ip');

    const statusRow = `<tr><td>${modelActual}</td><td>${model}:${index}</td>` +
                          `<td>${oldRdm}</td>` +
                          `<td id="opRow${++OpIndex}"></td></tr>`;
    $('#operations').append(statusRow);

    const cmd = `sonos!${model}:${index}!rdmconfig`;
    const url = `backDoor?command=${cmd}`;
    getFromBrightSign(url, function(index) {
      return function() {
        $(`#opRow${index}`).text('Submitted');
      };
    }(OpIndex));

    renewTopology();

    return false;
  });

  $('#reboot').click(function() {
    $(this).text('Please wait...');
    $('button').prop('disabled', true);
    setTimeout(function() {
      window.location.href = 'http://localhost:8008/experience/events/interface/reboot';
    },100);
    return false;
  });

  $('#disable-rdmhhsetup').click(function() {
    const statusRow = `<tr><td colspan="6">Disable HHSetup</td><td id="opRow${++OpIndex}"></td></tr>`;
    $('#operations').append(statusRow);

    const url = 'backDoor?command=sonos!sall!disablehouseholdmanagement';
    getFromBrightSign(url, function(index) {
      return function() {
        $(`#opRow${index}`).text('Submitted');
      };
    }(OpIndex));
    return false;
  });

  $('#factory-reset').click(function() {
    const statusRow = `<tr><td colspan="6">Factory Reset</td><td id="opRow${++OpIndex}"></td></tr>`;
    $('#operations').append(statusRow);

    const url = 'backDoor?command=sonos!sall!factoryreset';
    getFromBrightSign(url, function(index) {
      return function() {
        $(`#opRow${index}`).text('Submitted');
      };
    }(OpIndex));
    return false;
  });
});
