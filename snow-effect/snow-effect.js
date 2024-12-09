// ==UserScript==
// @name         Snow Effect
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Lässt es im Browser schneien, mit anpassbarer Größe und Geschwindigkeit
// @author       Tobias Kolodziej
// @match        https://sitegeist.de/
// @downloadURL  https://github.com/sg-tobias/Browser-Scripts/new/main.../main/snow-effect/snow-effect.js
// @updateURL    https://github.com/sg-tobias/Browser-Scripts/new/main.../main/snow-effect/snow-effect.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const MAX_SNOWFLAKES = 200; // Maximale Anzahl an Schneeflocken
    const SPEED_RANGE = [5, 15]; // Geschwindigkeit in Sekunden [Min, Max]
    const SIZE_RANGE = [10, 40]; // Größe in px [Min, Max]
    const snowflakes = new Set(); // Set zur Verwaltung aktiver Schneeflocken

    // CSS für Schneeflocken
    const style = document.createElement('style');
    style.innerHTML = `
        .snowflake {
            position: fixed;
            top: -10px;
            font-size: 1em;
            color: red;
            pointer-events: none;
            animation: fall linear infinite;
            z-index: 99999;
        }

        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

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
