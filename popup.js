// Reference: The Chromium Authors. 

'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.pageAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: 'OFF'});
  chrome.alarms.clearAll();
  window.close();
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('Try').addEventListener('click', setAlarm);
document.getElementById('5min').addEventListener('click', setAlarm);
document.getElementById('10min').addEventListener('click', setAlarm);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
