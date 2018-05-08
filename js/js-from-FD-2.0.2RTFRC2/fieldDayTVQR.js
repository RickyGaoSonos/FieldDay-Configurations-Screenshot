"use strict";

var lastTVQR;
var lastTVQRLowRes;

function displayTVQRData(us) {
  let qrtext = 'FieldDay TV Cfg';
  function addToQRText(type, text) { qrtext += qrtext ? ` / ${type}: ${text}` : `${type} : ${text}`; }
  for (const key in us) {
    const val = us[key];
    let id;

    switch (key.toLowerCase()) {
      case "firmware":
        addToQRText('BSFwVer', val);
        break;
      case "serialnumber":
        addToQRText('BSSerNo', val);
        break;
      case "model":
        addToQRText('BSModel', val);
        break;
      case "ip":
        addToQRText('NetIP', val);
        break;
      case "macaddress":
        addToQRText('MacAddr', val);
        break;
      case "presentationversion":
        addToQRText('PresVer', val);
        break;
    } 
  }

  qrtext = qrtext + " / End";
  if (qrtext !== lastTVQR) {
    // console.log(`QRText: Length: ${qrtext.length} Text: ${qrtext}`);
    $('#tvQRcode').html('').qrcode({text: qrtext, mode: 'Byte', width: 512, height: 512, correctLevel: 'M'});
    lastTVQR = qrtext;
  }

  qrtext = qrtext.toUpperCase().replace(/[^A-Z0-9 \$\%\*\+\-\.\/\:]/g, '%');
  if (qrtext !== lastTVQRLowRes) {
    // console.log(`QRText: Length: ${qrtext.length} Text: ${qrtext}`);
    $('#tvQRcodeLowRes').html('').qrcode({text: qrtext, mode: 'Alphanumeric',
                                          width: 512, height: 512,
                                          correctLevel: 'M'});
    lastTVQRLowRes = qrtext;
  }
}
