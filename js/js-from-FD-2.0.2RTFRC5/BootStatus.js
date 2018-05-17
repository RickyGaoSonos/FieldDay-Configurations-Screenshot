"use strict";

var varHost;
//varHost = 'http://10.96.1.102:8080/GetUserVars';  // Debug
var tvHost = '/experience/events/interface/';
//tvHost = 'http://10.96.1.102:8008/experience/events/interface/';  // Debug

var AlreadyTriedToFindTV = false;

var IsRunningOnBrightSign = false;
if (typeof(CloseAllBSClasses) === 'function') {
  CloseAllBSClasses(true);
  IsRunningOnBrightSign = true;
}

var refreshInterval = 500;

window.onload = function() {
  $('#reboot').click(doReboot);
  $('#TV').hide();
  efficientGetUserVars(doUserVars, varHost);
};

function doReboot() {
  const $button = $('#reboot');
  $button.text('Please wait...');
  $button.prop('disabled', true);
  setTimeout(function() {
    window.location.href='/experience/events/interface/reboot';
  }, 100);
  return false;
}

function doUserVars(us) {
  setTimeout(function(){efficientGetUserVars(doUserVars, varHost);}, refreshInterval);

  if (typeof us === 'undefined') {
    $('#status1').text('getUserVars failed - userVars (us) not defined.');
    return;
  }
  
  displayQRData(us);

  const model = (us.ExRModel || us.exrmodel);
  if (!AlreadyTriedToFindTV && (model === 'HT+TV' || model === 'HT-TV')) {
    AlreadyTriedToFindTV = true;
    $('#TV').show();
    console.log(tvHost + 'findTVData');
    efficientGet(foundTVVars, foundTVVars, tvHost + 'findTVData');
  }
}


function foundTVVars(response) {
  if (typeof response === 'undefined' || response.statusCode) {
    $('#status1').text('findTVData failed - response not defined.');
    return;
  }

  setTimeout(function() {
    efficientGet(getTVVars, getTVVars, tvHost + 'tvData');
  }, 5000);
}

function getTVVars(response) {
  if (typeof response === 'undefined' || response.statusCode) {
    $('#status1').text('getTVData failed - response not defined.');
    return;
  }

  const xmlDoc = $.parseXML(response);
  const $xml = $(xmlDoc);
  const varlist = {};
  $xml.find('BrightSignVar').each(function() {
    varlist[$(this).attr('name')] = $(this).text();
  });
  $xml.find('BrightSignStatus').children().each(function() {
    varlist[$(this).prop('tagName')] = $(this).text();
  });
  $xml.find('IP').each(function() {
    varlist[$(this).prop('tagName')] = $(this).text();
  });
  displayTVQRData(varlist);
}
