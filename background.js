// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function setAlarm() {
  console.log("setAlarm Function called")
	chrome.storage.sync.get(['minutes'], function(item) {
      chrome.browserAction.setBadgeText({text: 'ON'});
      chrome.alarms.create({periodInMinutes: item.minutes});
    });
  };

function noAlarmFB() {
  chrome.browserAction.setBadgeBackgroundColor({color: "#8B4513"});
  chrome.browserAction.setBadgeText({text: 'FB'});
}

function noAlarmNoFB() {
  chrome.browserAction.setBadgeBackgroundColor({color: "#8B4513"});
  chrome.browserAction.setBadgeText({text: ''});
}

function configureAlarm() {
  chrome.storage.sync.get(['onAlarm'], function(item) {
      chrome.alarms.getAll(function (alarms) {
        if (item.onAlarm == true && alarms.length == 0) {
          setAlarm();
        } else if (item.onAlarm == null || item.onAlarm == false) {
          console.log("uhm");
          noAlarmFB();
        }
      });
    });
}

function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf("facebook") == -1) {
    noAlarmNoFB();
  } else {
    configureAlarm();
  };
};

function playVideo() {
  // chrome.tabs.executeScript(null, {file: 'content.js'});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'angryman.png',
      title:    'Do work!!',
      message:  'Go back to work!',
      buttons: [
        {title: 'Keep working'}
      ],
      priority: 0});
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.alarms.onAlarm.addListener(playVideo);
