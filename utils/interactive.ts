/* ===========================================================
 * jquery-interactive_bg.js v1.0
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an interactive moving background
 * that reacts to viewer's cursor
 *
 * https://github.com/peachananr/interactive_bg
 *
 * License: GPL v3
 *
 * ========================================================== */

interface InteractiveBgOptions {
  strength?: number;
  scale?: number;
  animationSpeed?: string;
  contain?: boolean;
  wrapContent?: boolean;
}

const defaultOptions: InteractiveBgOptions = {
  strength: 25,
  scale: 1.05,
  animationSpeed: "100ms",
  contain: true,
  wrapContent: false,
};


function interactiveBg(element: HTMLElement, options?: InteractiveBgOptions) {
  const settings = { ...defaultOptions, ...options };
  const h = element.offsetHeight;
  const w = element.offsetWidth;
  const sh = settings.strength! / h;
  const sw = settings.strength! / w;
  const hasTouch = 'ontouchstart' in document.documentElement;

  if (settings.contain) {
    element.style.overflow = "hidden";
  }

  let bgContainer: HTMLDivElement;
  if (!settings.wrapContent) {
    bgContainer = document.createElement('div');
    bgContainer.className = 'ibg-bg';
    element.prepend(bgContainer);
  } else {
    bgContainer = document.createElement('div');
    bgContainer.className = 'ibg-bg';
    while (element.firstChild) {
      bgContainer.appendChild(element.firstChild);
    }
    element.appendChild(bgContainer);
  }

  const bgUrl = element.getAttribute('data-ibg-bg');
  if (bgUrl) {
    bgContainer.style.background = `url('${bgUrl}') no-repeat center center`;
    bgContainer.style.backgroundSize = "cover";
  }

  bgContainer.style.width = `${w}px`;
  bgContainer.style.height = `${h}px`;

  if (hasTouch || screen.width <= 699) {
    // Mobile: accelerometer support
    window.addEventListener('devicemotion', (event: DeviceMotionEvent) => {
      const accX = Math.round(event.accelerationIncludingGravity!.x! * 10) / 10;
      const accY = Math.round(event.accelerationIncludingGravity!.y! * 10) / 10;
      const xA = -(accX / 10) * settings.strength!;
      const yA = -(accY / 10) * settings.strength!;
      const newX = -(xA * 2);
      const newY = -(yA * 2);

      bgContainer.style.transform = `matrix(${settings.scale}, 0, 0, ${settings.scale}, ${newX}, ${newY})`;
    });
  } else {
    // Desktop: mouse interaction
    element.addEventListener('mouseenter', () => {
      if (settings.scale !== 1) element.classList.add('ibg-entering');
      bgContainer.style.transition = `transform ${settings.animationSpeed} linear`;
      bgContainer.style.transform = `matrix(${settings.scale}, 0, 0, ${settings.scale}, 0, 0)`;

      bgContainer.addEventListener('transitionend', () => {
        element.classList.remove('ibg-entering');
      });
    });

    element.addEventListener('mousemove', (e: MouseEvent) => {
      if (!element.classList.contains('ibg-entering') && !element.classList.contains('ibg-exiting')) {
        const pageX = e.pageX - element.getBoundingClientRect().left - w / 2;
        const pageY = e.pageY - element.getBoundingClientRect().top - h / 2;
        const newX = (sw * pageX) * -1;
        const newY = (sh * pageY) * -1;

        bgContainer.style.transition = 'none';
        bgContainer.style.transform = `matrix(${settings.scale}, 0, 0, ${settings.scale}, ${newX}, ${newY})`;
      }
    });

    element.addEventListener('mouseleave', () => {
      if (settings.scale !== 1) element.classList.add('ibg-exiting');
      bgContainer.style.transition = `transform ${settings.animationSpeed} linear`;
      bgContainer.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;

      bgContainer.addEventListener('transitionend', () => {
        element.classList.remove('ibg-exiting');
      });
    });
  }
}

// Usage example
const elements = document.querySelectorAll<HTMLElement>('.interactive-bg');
elements.forEach(el => interactiveBg(el, { strength: 30, scale: 1.1 }));
