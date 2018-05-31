"use strict";

var lastQR;
var lastQRLowRes;

function displayQRData(us, brief) {
  let qrtext = brief ? 'FieldDay Base Cfg' : 'FieldDay Cfg';
  function addToQRText(type, text) { qrtext += qrtext ? ` / ${type}: ${text}` : `${type} : ${text}`; }
  for (const key in us) {
    const val = us[key];
    let id;

    switch (key.toLowerCase()) {
      case "firmwareversion":
        addToQRText('BSFwVer', val);
        break;
      case "serialnumber":
        addToQRText('BSSerNo', val);
        break;
      case "bsmodel":
        addToQRText('BSModel', val);
        break;
      case "macaddress":
        addToQRText('MacAddr', val);
        break;
      case "presentationversion":
        addToQRText('PresVer', val);
        break;
    } 

    if (!brief) {
      switch (key.toLowerCase()) {
        case "netstatus":
          addToQRText('NetStat', val);
          break;
        case "netipaddress":
          addToQRText('NetIP', val);
          break;
        case "nagiosserver":
          addToQRText('Nagios', val);
          break;
        case "storecontrolserver":
          addToQRText('Dash', val);
          break;
        case "exrmodel":
          addToQRText('Exp', val);
          break;
        case "locale":
          addToQRText('Locale', val);
          break;
        case "speakermodel":
          addToQRText('Speak', val);
          break;
        case "collateraldefinition":
          addToQRText('Collat', val);
          break;
        case "statusmessage":
          id = '#status1';
          addToQRText('BootStat', val);
          break;
        case "statusmessage2":
          addToQRText('BootStat2', val);
          id = '#status2';
          break;
        case "unitid1":
          addToQRText('ID1', val);
          break;
        case "unitid2":
          addToQRText('ID2', val);
          break;
        case "startingvolumesetting":
          addToQRText('StartVol', val);
          break;
        case "maxvolumedefault":
          addToQRText('MaxVol', val);
          break;
        case "setgainsub":
          addToQRText('Sub', val);
          break;
        case "rdmmode":
          addToQRText('RDM', val);
          break;
        case "debugprint":
          addToQRText('Debug', val);
          break;
        case "runasdemo":
          addToQRText('Demo', val);
          break;
        case "sessiontimeoutdefault":
          addToQRText('Timeout', val);
          break;
      }
    }
    $(id).text(val);
  }

  qrtext = qrtext + " / End";
  if (brief) {
    $('.longQR').html('');
    $('.header').text('Base Config:');
    $('#baseQrcodeNote').css('display', 'block');
  }
  else {
    if (qrtext !== lastQR) {
      // console.log(`QRText: Length: ${qrtext.length} Text: ${qrtext}`);
      $('#qrcode').html('').qrcode({text: qrtext, mode: 'Byte', width: 512, height: 512, correctLevel: 'M'});
      lastQR = qrtext;
    }
  }

  qrtext = qrtext.toUpperCase().replace(/[^A-Z0-9 \$\%\*\+\-\.\/\:]/g, '%');
  if (qrtext !== lastQRLowRes) {
    // console.log(`QRText: Length: ${qrtext.length} Text: ${qrtext}`);
    $('#qrcodeLowRes').html('').qrcode({text: qrtext, mode: 'Alphanumeric', width: 512, height: 512,
                                        correctLevel: brief ? 'H' : 'M'});
    lastQRLowRes = qrtext;
  }
}
