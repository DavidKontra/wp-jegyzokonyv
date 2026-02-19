// ==UserScript==
// @name         WP Jegyzőkönyv
// @namespace    https://github.com/DavidKontra/
// @version      1.0
// @description  Floatáló gomb a Teams-ben a WP Jegyzőkönyv megnyitásához
// @author       Kontra Dávid
// @match        https://teams.microsoft.com/*
// @match        https://teams.live.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const NOTES_URL = 'https://davidkontra.github.io/wp-jegyzokonyv/';

    function addButton() {
        if (document.getElementById('wp-jk-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'wp-jk-btn';
        btn.title = 'WP Jegyzőkönyv megnyitása';
        btn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="2" width="16" height="20" rx="2" fill="white" opacity="0.9"/>
                <line x1="8" y1="7" x2="16" y2="7" stroke="#6264A7" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="8" y1="11" x2="16" y2="11" stroke="#6264A7" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="8" y1="15" x2="13" y2="15" stroke="#6264A7" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>Jegyzőkönyv</span>
        `;

        btn.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            background: #6264A7;
            color: white;
            border: none;
            border-radius: 24px;
            cursor: pointer;
            font-family: 'Segoe UI', sans-serif;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(98,100,167,0.5);
            transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
            user-select: none;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#4F5190';
            btn.style.boxShadow = '0 6px 16px rgba(98,100,167,0.65)';
            btn.style.transform = 'translateY(-1px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#6264A7';
            btn.style.boxShadow = '0 4px 12px rgba(98,100,167,0.5)';
            btn.style.transform = 'translateY(0)';
        });

        btn.addEventListener('click', () => {
            window.open(
                NOTES_URL,
                'wp-jegyzokonyv',
                'width=820,height=700,resizable=yes,scrollbars=yes'
            );
        });

        document.body.appendChild(btn);
    }

    // Teams SPA: várjuk meg a body betöltődését, majd figyeljük az URL változásokat
    function init() {
        addButton();
        // SPA navigációknál is maradjon a gomb
        const observer = new MutationObserver(() => {
            if (!document.getElementById('wp-jk-btn')) {
                addButton();
            }
        });
        observer.observe(document.body, { childList: true, subtree: false });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
