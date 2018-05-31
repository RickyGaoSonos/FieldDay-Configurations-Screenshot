var PORT = 5000;

function ButtonMusic() {
  var message = new Buffer('DISPLAYBUTTON_MUSIC:PRESSED');
  SendMessage(message)
}

function ButtonLearn() {
  var message = new Buffer('DISPLAYBUTTON_LEARN:PRESSED');
  SendMessage(message)
}

function ButtonVideo() {
  var message = new Buffer('DISPLAYBUTTON_VIDEO:PRESSED');
  SendMessage(message)
}

function ButtonVolUp() {
  var message = new Buffer('DISPLAYBUTTON_VOL_UP:PRESSED');
  SendMessage(message)
}

function ButtonVolDown() {
  var message = new Buffer('DISPLAYBUTTON_VOL_DOWN:PRESSED');
  SendMessage(message)
}

function ButtonSUB() {
  var message = new Buffer('DISPLAYBUTTON_SUB:PRESSED');
  SendMessage(message)
}

function ButtonReset() {
  var message = new Buffer('DISPLAYBUTTON_RESET:PRESSED');
  SendMessage(message)
}

function SendMessage(message) {
  var client = dgram.createSocket('udp4');
  client.send(message, 0, message.length, PORT, testIP, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + testIP + ':' + PORT);
    client.close();
  });
}
