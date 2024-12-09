// ==UserScript==
// @name         Snow Effect
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Lässt es im Browser schneien, mit anpassbarer Größe und Geschwindigkeit
// @author       Tobias Kolodziej
// @match        https://sitegeist.de/
// @downloadURL  https://raw.githubusercontent.com/sg-tobias/Browser-Scripts/refs/heads/main/snow-effect/snow-effect.js
// @updateURL    https://raw.githubusercontent.com/sg-tobias/Browser-Scripts/refs/heads/main/snow-effect/snow-effect.js
// @resource     IMPORTED_CSS https://git.sitegeist.de/Tobias.Kolodziej/browser-scripte/-/raw/main/snow-effect/snow-effect.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const MAX_SNOWFLAKES = 200; // Maximale Anzahl an Schneeflocken
    const SPEED_RANGE = [5, 15]; // Geschwindigkeit in Sekunden [Min, Max]
    const SIZE_RANGE = [10, 40]; // Größe in px [Min, Max]
    const snowflakes = new Set(); // Set zur Verwaltung aktiver Schneeflocken

     // Load CSS from GIT
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);

    // Zufallswert im Bereich [min, max] generieren
    function randomInRange([min, max]) {
        return Math.random() * (max - min) + min;
    }

    // Schneeflocken erzeugen
    function createSnowflake() {
        if (snowflakes.size >= MAX_SNOWFLAKES) {
            return; // Keine neuen Schneeflocken, wenn das Limit erreicht ist
        }

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄';

        // Zufällige Position, Größe und Geschwindigkeit
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.fontSize = `${randomInRange(SIZE_RANGE)}px`;
        const animationDuration = randomInRange(SPEED_RANGE);

        snowflake.style.animationDuration = `${animationDuration}s`;

        document.body.appendChild(snowflake);
        snowflakes.add(snowflake);

        // Schneeflocke nach Animation entfernen
        snowflake.addEventListener('animationend', () => {
            snowflakes.delete(snowflake);
            snowflake.remove();
        });
    }

    // Schneeflocken in Intervallen erzeugen
    setInterval(createSnowflake, 100);
})();
