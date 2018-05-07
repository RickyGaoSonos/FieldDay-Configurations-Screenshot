function createDriver() {
  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  return driver;
}

function findConsole(driver) {
  driver.get("http://" + testIP + ":2999/");
  driver.findElement(webdriver.By.className('description')).click();

  var wrappingElement2 = driver.findElement(By.className("insertion-point-main"));
  driver.executeScript('return document.getElementsByClassName("insertion-point-main")[0].shadowRoot').then(function(returnValue) {
    returnValue.findElement(By.id("tab-console")).click();
  });

  var testconsole = driver.wait(webdriver.until.elementLocated(By.id('console-prompt')), 2000);

  driver.executeScript("window.isEnterKey = function(evt){ return evt.keyCode === 13;}");

  return testconsole;
}

function instrumentationCode(testconsole) {
  var tempcode = 'function getAllFunctions(){var n=[];for(var i in this)this.hasOwnProperty(i)&&this[i]instanceof Function&&!/myfunctions/i.test(i)&&this[i].name.length>=1&&n.push(this[i].name);return n}var allfns=window.getAllFunctions(),coveredfunctions=[];function isOneoffunction(n){for(i=0;i<allfns.length;i++)if(n==allfns[i]&&"isOneoffunction"!=n)return!0;return!1}function augment(n){var i,t;for(i in window)"function"==typeof(t=window[i])&&isOneoffunction(t.name)&&(window[i]=function(i,t){var o=arguments;return function(){return n.apply(this,o),t.apply(this,arguments)}}(i,t))}augment(function(n,i){coveredfunctions.push(n)});function arr_diff(r,e){for(var f=[],n=[],t=0;t<r.length;t++)f[r[t]]=!0;for(t=0;t<e.length;t++)f[e[t]]?delete f[e[t]]:f[e[t]]=!0;for(var o in f)n.push(o);return n};';
  executeScript(tempcode);
  hitEnter();
}


function checkCoverage(testconosle) {
  var tempcode = 'var uniqueNames=[];$.each(coveredfunctions,function(e,n){-1===$.inArray(n,uniqueNames)&&uniqueNames.push(n)}),console.log((uniqueNames.length)/allfns.length),console.log(arr_diff(uniqueNames,allfns));';
  executeScript(tempcode);
  hitEnter();
}

function executeScript(tempcode){
  driver.executeScript(testconsoleText + '=arguments[0];',tempcode);
}

function hitEnter(){
  driver.wait(testconsole.sendKeys(Key.ENTER), enterDelay);
}


//==============

//======To get all function names========
// function getAllFunctions() {
//   var myfunctions = [];
//   for (var l in this) {
//     if (this.hasOwnProperty(l) &&
//       this[l] instanceof Function &&
//       !/myfunctions/i.test(l)) {
//
//       if (this[l].name.length >= 1)
//         myfunctions.push(this[l].name);
//     }
//   }
//   return myfunctions;
// }
//
// var allfns = window.getAllFunctions();
// var coveredfunctions = [];
//
// function isOneoffunction(name) {
//   for (i = 0; i < allfns.length; i++) {
//     if (name == allfns[i] && name != 'isOneoffunction') return true;
//   }
//   return false;
// }
//
// function augment(withFn) {
//   var name, fn;
//   for (name in window) {
//     fn = window[name];
//     if (typeof fn === 'function' && isOneoffunction(fn.name)) {
//       window[name] = (function(name, fn) {
//         var args = arguments;
//         return function() {
//           withFn.apply(this, args);
//           return fn.apply(this, arguments);
//
//         }
//       })(name, fn);
//     }
//   }
// }
//
// augment(function(name, fn) {
//   coveredfunctions.push(name);
// });
