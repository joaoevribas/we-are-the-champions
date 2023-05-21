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

// PUBLISH BUTTON
publishEl.addEventListener("click", function () {
  let inputValue = inputAreaEl.value;

  appendToEndorsements(inputValue);
  clearInputAreaEl();
});

// FUNCTIONS
function appendToEndorsements(paragraph) {
  let newEl = document.createElement("p");
  newEl.textContent = inputAreaEl.value;
  endorsementsEl.append(newEl);
}

function clearInputAreaEl() {
  inputAreaEl.value = "";
}
