

function Predefined() {
  openPresent();

  delay(5000)
    .then(() => {
      SkipVideoAIO();

      if (stop == 1) {
        stop = 0;
        delay(1000)
          .then(() => {
            reset();
          });
        return;
      }

      delay(4000)
        .then(() => {
          Play_Video_Sonos_Intro();

          if (stop == 1) {
            stop = 0;
            delay(1000)
              .then(() => {
                reset();
              });
            return;
          }

          delay(4000)
            .then(() => {
              SkipVideoAIO();

              if (stop == 1) {
                stop = 0;
                delay(1000)
                  .then(() => {
                    reset();
                  });
                return;
              }

              delay(4000)
                .then(() => {
                  Play_Human();

                  if (stop == 1) {
                    stop = 0;
                    delay(1000)
                      .then(() => {
                        reset();
                      });
                    return;
                  }

                  delay(4000)
                    .then(() => {
                      change_volume(80);

                      if (stop == 1) {
                        stop = 0;
                        delay(1000)
                          .then(() => {
                            reset();
                          });
                        return;
                      }

                      delay(4000)
                        .then(() => {
                          change_volume(40);

                          if (stop == 1) {
                            stop = 0;
                            delay(1000)
                              .then(() => {
                                reset();
                              });
                            return;
                          }

                          delay(4000)
                            .then(() => {
                              Play_On_Off();

                              if (stop == 1) {
                                stop = 0;
                                delay(1000)
                                  .then(() => {
                                    reset();
                                  });
                                return;
                              }

                              delay(4000)
                                .then(() => {
                                  ChangetoPlay5();

                                  if (stop == 1) {
                                    stop = 0;
                                    delay(1000)
                                      .then(() => {
                                        reset();
                                      });
                                    return;
                                  }

                                  delay(4000)
                                    .then(() => {
                                      ChangetoSonosOne();

                                      if (stop == 1) {
                                        stop = 0;
                                        delay(1000)
                                          .then(() => {
                                            reset();
                                          });
                                        return;
                                      }

                                      delay(4000)
                                        .then(() => {
                                          goPageCompage();

                                          if (stop == 1) {
                                            stop = 0;
                                            delay(1000)
                                              .then(() => {
                                                reset();
                                              });
                                            return;
                                          }

                                          delay(4000)
                                            .then(() => {
                                              changeWhite();

                                              if (stop == 1) {
                                                stop = 0;
                                                delay(1000)
                                                  .then(() => {
                                                    reset();
                                                  });
                                                return;
                                              }

                                              delay(4000)
                                                .then(() => {
                                                  reset();
                                                  stop = 0;
                                                  document.getElementById("Predefined").disabled = false;
                                                  document.getElementById("StopPredefined").disabled = true;

                                                  if (stop == 1) {
                                                    stop = 0;
                                                    delay(1000)
                                                      .then(() => {
                                                        reset();
                                                      });
                                                    return;
                                                  }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function PredefinedHT() {
  openPresent();

  delay(5000)
    .then(() => {
      change_volume(30);

      if (stop == 1) {
        stop = 0;
        delay(1000)
          .then(() => {
            reset();
          });
        return;
      }

      delay(4000)
        .then(() => {
          Play_Human();

          if (stop == 1) {
            stop = 0;
            delay(1000)
              .then(() => {
                reset();
              });
            return;
          }

          delay(4000)
            .then(() => {
              change_volume(80);

              if (stop == 1) {
                stop = 0;
                delay(1000)
                  .then(() => {
                    reset();
                  });
                return;
              }

              delay(4000)
                .then(() => {
                  change_volume(40);

                  if (stop == 1) {
                    stop = 0;
                    delay(1000)
                      .then(() => {
                        reset();
                      });
                    return;
                  }

                  delay(4000)
                    .then(() => {
                      Play_Video_Samurai();

                      if (stop == 1) {
                        stop = 0;
                        delay(1000)
                          .then(() => {
                            reset();
                          });
                        return;
                      }

                      delay(4000)
                        .then(() => {
                          ChangetoPlayBar();

                          if (stop == 1) {
                            stop = 0;
                            delay(1000)
                              .then(() => {
                                reset();
                              });
                            return;
                          }

                          delay(4000)
                            .then(() => {
                              ChangetoPlayBase();

                              if (stop == 1) {
                                stop = 0;
                                delay(1000)
                                  .then(() => {
                                    reset();
                                  });
                                return;
                              }
                              delay(4000)
                                .then(() => {
                                  AddSub();

                                  if (stop == 1) {
                                    stop = 0;
                                    delay(1000)
                                      .then(() => {
                                        reset();
                                      });
                                    return;
                                  }

                                  delay(5000)
                                    .then(() => {
                                      Play_Video_Sonos_Intro();

                                      if (stop == 1) {
                                        stop = 0;
                                        delay(1000)
                                          .then(() => {
                                            reset();
                                          });
                                        return;
                                      }

                                      delay(4000)
                                        .then(() => {
                                          goPageCompage();

                                          if (stop == 1) {
                                            stop = 0;
                                            delay(1000)
                                              .then(() => {
                                                reset();
                                              });
                                            return;
                                          }

                                          delay(4000)
                                            .then(() => {
                                              changeWhiteHT_RTF();

                                              if (stop == 1) {
                                                stop = 0;
                                                delay(1000)
                                                  .then(() => {
                                                    reset();
                                                  });
                                                return;
                                              }

                                              delay(4000)
                                                .then(() => {
                                                  reset();
                                                  stop = 0;
                                                  document.getElementById("Predefined").disabled = false;
                                                  document.getElementById("StopPredefined").disabled = true;

                                                  if (stop == 1) {
                                                    stop = 0;
                                                    delay(1000)
                                                      .then(() => {
                                                        reset();
                                                      });
                                                    return;
                                                  }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function change_volume(number) {
  checkDriver();
  $('#testingStatus').html("Change Volume to " + number);
  var tempcode = '$(".volume").val(' + number + ').trigger("input");$(".volume-active-track").width(242*' + number + '/100);$(".volume-icon").toggleClass("mute",0==' + number + ');';
  executeScript(tempcode);
  hitEnter();
}

function reset() {
  checkDriver();
  $('#testingStatus').html("Reset Presentation");
  var tempcode = '$(document.getElementsByClassName("areaReset")).click();';
  executeScript(tempcode);
  hitEnter();
}

function goPageCompage() {
  checkDriver();
  $('#testingStatus').html("Go to Compare Page");
  var tempcode = '$(document.getElementsByClassName("areaCompare")).click();';
  executeScript(tempcode);
  hitEnter();
}

function ClickAIOCompare() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-tab=AIO]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ClickHTCompare() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-tab=HT]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ClickComponentCompare() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-tab=COMP]").click()';
  executeScript(tempcode);
  hitEnter();
}

function AIOScrollBottom() {
  checkDriver();
  var tempcode = "document.getElementsByClassName('divComparePage')[0].scrollTop=943;";
  executeScript(tempcode);
  hitEnter();
}

function HTScrollBottom() {
  checkDriver();
  var tempcode = "document.getElementsByClassName('divComparePage')[1].scrollTop=943;";
  executeScript(tempcode);
  hitEnter();
}

function ComponentsScrollBottom() {
  checkDriver();
  var tempcode = "document.getElementsByClassName('divComparePage')[2].scrollTop=943;";
  executeScript(tempcode);
  hitEnter();
}

function changeWhite() {
  checkDriver();
  $('#testingStatus').html("Change all devices color to White");
  var tempcode = "$(document.getElementById('catalogProductMapPLAY1').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapONE').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapPLAY5').getElementsByClassName('compareWhite')).click();";
  executeScript(tempcode);
  hitEnter();
}

function changeWhiteHT() {
  checkDriver();
  $('#testingStatus').html("Change all devices color to White");
  var tempcode = "$(document.getElementById('compareMap1').getElementsByClassName('compareWhite')).click();$(document.getElementById('compareMap2').getElementsByClassName('compareWhite')).click();$(document.getElementById('compareMap4').getElementsByClassName('compareWhite')).click();";
  executeScript(tempcode);
  hitEnter();
}

function changeWhiteHT_RTF() {
  checkDriver();
  $('#testingStatus').html("Change all devices color to White");
  var tempcode = "$(document.getElementById('catalogProductMapBEAM').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapPLAYBASE').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapSUB').getElementsByClassName('compareWhite')).click();";
  executeScript(tempcode);
  hitEnter();
}

function changeWhiteAIO_RTF() {
  checkDriver();
  $('#testingStatus').html("Change all devices color to White");
  var tempcode = "$(document.getElementById('catalogProductMapPLAY1').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapPLAY5').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapONE').getElementsByClassName('compareWhite')).click();";
  executeScript(tempcode);
  hitEnter();
}

function changeSideCOMP_RTF() {
  checkDriver();
  $('#testingStatus').html("Change all devices color to White");
  var tempcode = "$(document.getElementById('catalogProductMapCONNECT').getElementsByClassName('compareWhite')).click();$(document.getElementById('catalogProductMapCONNECTAMP').getElementsByClassName('compareWhite')).click();";
  executeScript(tempcode);
  hitEnter();
}

function changeBlack() {
  checkDriver();
  var tempcode = "$(document.getElementById('compareMap1').getElementsByClassName('compareBlack')).click();$(document.getElementById('compareMap2').getElementsByClassName('compareBlack')).click();$(document.getElementById('compareMap3').getElementsByClassName('compareBlack')).click();";
  executeScript(tempcode);
  hitEnter();
}

function openAIOPresent() {
  openPresent();
}

function openPresent() {
  checkDriver();
  $('#testingStatus').html("Open Prentation");
  var tempcode = 'openPresentation();';
  executeScript(tempcode);
  hitEnter();
}

function SkipVideoAIO() {
  checkDriver();
  $('#testingStatus').html("Skip Prentation Video");
  var tempcode = "$(document.getElementsByClassName('areaVideoBack')).click()";
  executeScript(tempcode);
  hitEnter();
}

function Play_Human() {
  checkDriver();
  $('#testingStatus').html("Play Human");
  var tempcode = 'document.querySelector("*[data-item=Rag_N_Bone_Man]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Andromeda() {
  checkDriver();
  $('#testingStatus').html("Play Andromeda");
  var tempcode = 'document.querySelector("*[data-item=Gorillaz]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Switch_ELRey_Playbase() {
  checkDriver();
  $('#testingStatus').html("Switch to ELRey");
  var tempcode = 'var count = 0;var device_change_interval = setInterval(function (){if( count % 2 == 0) {document.querySelector("*[data-player=ELREY]").click(); count++;}else {document.querySelector("*[data-player=PLAYBASE]").click(); count--;}}, 3000);';
  executeScript(tempcode);
  hitEnter();
}

function Switch_Devices() {
  checkDriver();
  var tempcode = 'var device_change_interval = setInterval(function (){var count = Math.floor(Math.random() * 3) + 1;if( count == 1) {document.querySelector("*[data-player=ELREY]").click();} if(count == 2) {document.querySelector("*[data-player=PLAYBASE]").click();} if( count == 3) {document.querySelector("*[data-player=PLAYBAR]").click();}}, 1000);';
  executeScript(tempcode);
  hitEnter();
}

function Switch_Songs() {
  checkDriver();
  var tempcode = 'var count = 0;var songs_change_interval = setInterval(function (){if( count % 2 == 0) {document.querySelector("*[data-item=Maggie_Rogers]").click(); count++;}else {document.querySelector("*[data-item=Gorillaz]").click(); count--;}}, 3000);';
  executeScript(tempcode);
  hitEnter();
}

function Switch_Videos() {
  checkDriver();
  var tempcode = 'var count = 0;var videos_change_interval = setInterval(function (){if( count % 2 == 0) {document.querySelector("*[data-item=Samurai]").click(); count++;}else {document.querySelector("*[data-item=Pacific_Rim]").click(); count--;}}, 3000);';
  executeScript(tempcode);
  hitEnter();
}

function Play_On_Off() {
  checkDriver();
  $('#testingStatus').html("Play On and Off");
  var tempcode = 'document.querySelector("*[data-item=Maggie_Rogers]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_J_Boy() {
  checkDriver();
  $('#testingStatus').html("Play J Boy");
  var tempcode = 'document.querySelector("*[data-item=Phoenix]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_Samurai() {
  checkDriver();
  $('#testingStatus').html("Play Samurai");
  var tempcode = 'document.querySelector("*[data-item=Samurai]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_Pacific_Rim() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-item=Pacific_Rim]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_AndrewBird() {
  checkDriver();
  $('#testingStatus').html("Play Andrew Bird");
  var tempcode = 'document.querySelector("*[data-item=Andrew_Bird]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_Kiss() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-item=Kiss]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_Big_Lebowski() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-item=The_Big_Lebowski]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_SFX_Film() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-item=SFX]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_Sonos_One() {
  checkDriver();
  var tempcode = 'document.querySelector("*[data-item=SONOSONE]").click()';
  executeScript(tempcode);
  hitEnter();
}

function Play_Video_Sonos_Intro() {
  checkDriver();
  $('#testingStatus').html("Play Sonos Intro Video");
  var tempcode = 'document.querySelector("*[data-item=What_Is_Sonos]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoPlay1() {
  checkDriver();
  $('#testingStatus').html("Change to Play1");
  var tempcode = 'document.querySelector("*[data-player=PLAY1]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoPlay3() {
  checkDriver();
  $('#testingStatus').html("Change to Play3");
  var tempcode = 'document.querySelector("*[data-player=PLAY3]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoPlay5() {
  checkDriver();
  $('#testingStatus').html("Change to Play5");
  var tempcode = 'document.querySelector("*[data-player=PLAY5]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoSonosOne() {
  checkDriver();
  $('#testingStatus').html("Change to SonosOne");
  var tempcode = 'document.querySelector("*[data-player=SONOSONE]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoPlayBar() {
  checkDriver();
  $('#testingStatus').html("Change to Playbar");
  var tempcode = 'document.querySelector("*[data-player=PLAYBAR]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoPlayBase() {
  checkDriver();
  $('#testingStatus').html("Change to Playbase");
  var tempcode = 'document.querySelector("*[data-player=PLAYBASE]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoElRay() {
  checkDriver();
  $('#testingStatus').html("Change to ELRay");
  var tempcode = 'document.querySelector("*[data-player=ELREY]").click()';
  executeScript(tempcode);
  hitEnter();
}

function ChangetoBEAM() {
  checkDriver();
  $('#testingStatus').html("Change to BEAM");
  var tempcode = 'document.querySelector("*[data-player=BEAM]").click()';
  executeScript(tempcode);
  hitEnter();
}

function AddSub() {
  checkDriver();
  $('#testingStatus').html("Turn on Sub");
  var tempcode = 'document.querySelector("*[data-player=SUB]").click()';
  executeScript(tempcode);
  hitEnter();
}

function StopInterval() {
  checkDriver();
  var tempcode = 'clearInterval(device_change_interval);clearInterval(songs_change_interval);clearInterval(videos_change_interval);';
  executeScript(tempcode);
  hitEnter();
}

function checkDriver() {
  if (driver == null || testconsole == null) {
    driver = createDriver();
    testconsole = findConsole(driver);
  }
}
