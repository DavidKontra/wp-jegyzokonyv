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

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('width', '20');
        icon.setAttribute('height', '20');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '4'); rect.setAttribute('y', '2');
        rect.setAttribute('width', '16'); rect.setAttribute('height', '20');
        rect.setAttribute('rx', '2'); rect.setAttribute('fill', 'white');
        const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l1.setAttribute('x1','8');l1.setAttribute('y1','8');l1.setAttribute('x2','16');l1.setAttribute('y2','8');
        l1.setAttribute('stroke','#6264A7');l1.setAttribute('stroke-width','1.5');
        const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l2.setAttribute('x1','8');l2.setAttribute('y1','12');l2.setAttribute('x2','16');l2.setAttribute('y2','12');
        l2.setAttribute('stroke','#6264A7');l2.setAttribute('stroke-width','1.5');
        const l3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l3.setAttribute('x1','8');l3.setAttribute('y1','16');l3.setAttribute('x2','13');l3.setAttribute('y2','16');
        l3.setAttribute('stroke','#6264A7');l3.setAttribute('stroke-width','1.5');
        icon.appendChild(rect); icon.appendChild(l1); icon.appendChild(l2); icon.appendChild(l3);

        btn.appendChild(icon);

        btn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 16px;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            padding: 0;
            background: #6264A7;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(98,100,167,0.5);
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
