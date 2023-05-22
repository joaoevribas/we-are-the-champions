"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-scrimba-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

// DOM
const publishEl = document.getElementById("publish");
const inputAreaEl = document.getElementById("inputArea");
const endorsementsEl = document.getElementById("endorsements");
const inputFromEl = document.getElementById("input-from");
const inputToEl = document.getElementById("input-to");

// PUBLISH BUTTON
publishEl.addEventListener("click", function () {
  let inputValue = inputAreaEl.value;

  if (inputValue.length > 0) {
    push(endorsementsInDB, inputValue);
    clearInputAreaEl();
  } else {
    alert("Write something before using the Publish button");
  }
});

// FUNCTIONS
function appendToEndorsements(endorsements) {
  let endorsementsID = endorsements[0];
  let endorsementsValue = endorsements[1];

  let newEl = document.createElement("p");
  newEl.textContent = endorsementsValue;
  endorsementsEl.append(newEl);

  newEl.addEventListener("click", function () {
    let exactLocationOfEndorsementInDB = ref(
      database,
      `endorsements/${endorsementsID}`
    );
    remove(exactLocationOfEndorsementInDB);
  });
}

function clearInputAreaEl() {
  inputAreaEl.value = "";
}

function clearEndorsementsEl() {
  endorsementsEl.innerHTML = "";
}

// GET DATA FROM DB
onValue(endorsementsInDB, function (snapchot) {
  if (snapchot.exists()) {
    let endorsementsArray = Object.entries(snapchot.val());

    clearEndorsementsEl();

    for (let i = 0; i < endorsementsArray.length; i++) {
      let currentEndorsement = endorsementsArray[i];
      appendToEndorsements(currentEndorsement);
    }
  } else {
    clearEndorsementsEl();
  }
});
