"use strict";

var host;
host = 'http://localhost:8080/GetUserVars';
//host = 'http://10.96.1.2:8080/GetUserVars';  // Debug

function doUserVars(us) {
  if (typeof us === 'undefined')
  {
    console.log("userVars not defined");
    setTimeout(function(){efficientGetUserVars(doUserVars, host);}, 1000);
    return;
  }
  const isSimpleDemo = (us.simpleDemoButtonSetup === 'true');
  if (us.ExRModel === '' || isSimpleDemo) {
    $('.control').prop('disabled', true);
    $('#authenticate').html('<span style="font-size: 200%">Entering Quick Config</span>');
    doSetup(null, true);
  }
}

function doSetup(password, forceToQuick, extraArgs) {
  let url = `http://sonos:${atob('c29ub3Nyb2NrcyE=')}@localhost:8008/`;

  if (password === 'stat') {
    url = 'http://localhost:8008/BootStatus.html';
  }
  else if (forceToQuick) {
    url = url + '?setup=Quick' + (extraArgs || '');
  }
  else if (password === atob('aXdhbnQycmVjb25maWc=')) {
    url = url + '?setup=Menu' + (extraArgs || '');
  }
  else if (password === atob('aXdhbnQyaGlqYWNr')) {
    url = `http://sonos:${atob('c29ub3Nyb2NrcyE=')}@localhost:8008/Firmware.html?setup=RDM`;
  }
  else if (password !== atob('MXRyaWNreXBhc3M=')) {
    $('#password').val('');
    $('#password-label').css('color', 'red');
    $('button').prop('disabled', false);
    return;
  }

  $(this).text('Please wait...');
  setTimeout(function() {
    window.location.href = url;
  },100);
}

$( document ).ready(function() {
  setTimeout(function(){ efficientGetUserVars(doUserVars, host);}, 500);

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
      const $el = $(el);
      if ($el.attr('type') === 'password') {
//        This lets you see all the characters in passwords as you type them.  Careful!!!
//        $('.ui-keyboard-preview-wrapper').find('input').attr('type', 'text');
      }
      const label = $el.prev().html();
      const preview = `<span class"ui-keyboard-preview-label">${label} &nbsp;</span>`;
      $('.ui-keyboard-preview-wrapper').prepend(preview);
    }
  }).addCaret({
    caretClass: '',
    // *** for future use ***
    // data-attribute containing the character(s) next to the caret
    charAttr: 'data-character',
    // # character(s) next to the caret (can be negative for RTL)
    // default is 1 which shows the character to the right of the caret
    // setting this to -1 shows the character to the left
    charIndex: -1,
    // tweak caret position & height
    offsetX: 0,
    offsetY: -2,
    adjustHt: 0
  });

  $('#configure').click(function() {
    // This delay leaves enough time for the OSK to transfer the password to the input field.
    $('button').prop('disabled', true);
    setTimeout(function() {
      const password = $('#password').val();

      doSetup(password);
    }, 200);
  });

  $('#reboot').click(function() {
    $(this).text('Please wait...');
    $('button').prop('disabled', true);
    setTimeout(function() {
      window.location.href = 'http://localhost:8008/experience/events/interface/reboot';
    },100);
  });

  setTimeout(function() {
    window.location.href = 'http://localhost:8008/experience/events/interface/reboot';
  }, 120000);
});
