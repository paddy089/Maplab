/* global $, skrollr */
$(() => {
  (function () {
    'use strict';

    let scrollPosition = 0;
    let c01LastScrollPos = 0;

    const $window = $(window);
    const requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame;
  
    // ### page elements ### //
    let c01TitleMovement = false;
    const c01BigTitleElements = {};

    // animation anchors
    const anchor = {
      a01: 750,
      a02: 720,
      a03: 3200
    };

    // ### functions ### //
    function moveIt() {

      // moveTitle();
      // moveTitleExtras();
    }

    function setupTitleElements() {
      const obj = c01BigTitleElements;
      const children = $('.title-maplab').children();
      children.each(i => {
        const factor = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
        // const factor = 2;
        const $el = children.eq(i);
        const key = 'el' + i;
        obj[key] = {
          el: $el,
          speed: factor,
          lastPosition: 0
        };
      });
      // console.log(c01BigTitleElements);
    }

    function moveTitle() {
      // console.log('lastSP: ' + c01LastScrollPos);

      if (scrollPosition < anchor.a01) {
        Object.keys(c01BigTitleElements).forEach(key => {
          const _key = c01BigTitleElements[key];
          const _el = _key.el;
          const y = scrollPosition / _key.speed * -1;

          setTranslate3d(0, y, 0, _el);
        });
        c01LastScrollPos = scrollPosition;
        c01TitleMovement = true;
      } else if (scrollPosition > 4900) {
        Object.keys(c01BigTitleElements).forEach(key => {
          const _key = c01BigTitleElements[key];
          const _el = _key.el;

          if (!c01TitleMovement) {
            const d = getTranslateValues(_el);
            _key.lastPosition = d.y; // Math.round(d.y);
            console.log(_key.lastPosition);
          }
          const y = Math.round(((scrollPosition - 4900) - _key.lastPosition) * -1);
          console.log('y: ' + y);

          setTranslate3d(0, y, 0, _el);
        });
        c01TitleMovement = true;
      } else {
        c01TitleMovement = false;
      }
    }

    function moveTitleExtras() {
      const $el1 = $('.lab-verb-title-01');
      const $el2 = $('.lab-verb-title-02');
      const $el3 = $('.lab-verb-title-03');
      // const $el4 = $('.x-scroll');
      const $c03 = $('.c-03');
      const $c04 = $('.c-04');
      const y1 = scrollPosition / 5;
      const y2 = scrollPosition * -1.2;
      const y3 = scrollPosition * -1.1;
      const x4 = scrollPosition / 10;
      const x5 = scrollPosition / 15;
      const c03Top = $c03.offset().top;

      const vTop = $window.scrollTop();
      const vBottom = vTop + $window.height();
      const c03Bottom = c03Top + $c03.outerHeight();

      if (scrollPosition < anchor.a02) {
        setTranslate3d(0, y1, 0, $el1);
      }

      if (scrollPosition < 1330) {
        setTranslate3d(0, y3, 0, $el3);
      }

      if (scrollPosition < 1100) {
        setTranslate3d(0, y2, 0, $el2);
      }

      if (scrollPosition > 1400) {
        const elD3 = getTranslateValues($el3);
        const elD2 = getTranslateValues($el2);
        setTranslate3d(-x5, elD3.y, 0, $el3);
        setTranslate3d(x5, elD2.y, 0, $el2);
      }
    }

    function setTranslate3d(x = 0, y = 0, z = 0, $el = isRequired('jQuery element')) {
      $el.css({
        transform: 'translate3d(' + x + '%, ' + y + '%, ' + z + 'px)'
      });
    }

    function isRequired(name) {
      throw new Error(name + ' is required!');
    }

    function getTranslateValues($el) {
      const _$el = $el;
      const transformMatrix = _$el.css('-webkit-transform') ||
        _$el.css('-moz-transform') ||
        _$el.css('-ms-transform') ||
        _$el.css('-o-transform') ||
        _$el.css('transform');

      const matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
      const dx = parseInt(matrix[12] || matrix[4], 10);
      const dy = parseInt(matrix[13] || matrix[5], 10);

      return {
        x: dx,
        y: dy
      };
    }

    function testOrientation(width = isRequired('width'), height = isRequired('height')) {
      // const landscape = width > height * 1.44;
      const landscape = width > height * 1.2;
      if (landscape) {
        $('.portrait').hide();
        $('.parallax').show();
        // console.log('LANDSCAPE');
      } else {
        // console.log('PORTRAIT');
        $('.parallax').hide();
        $('.portrait').show();
      }
    }

    function setup() {
      $('.portrait').hide();
      // setupTitleElements();
      skrollr.init({
        smoothScrolling: true,
        scale: 3,
        forceHeight: false
      });
      

      $window.on('resize orientationchange', () => {
        const width = $window.width() || screen.width;
        const height = $window.height() || screen.height;
        testOrientation(width, height);
      });

      $window.on('scroll', () => {
        // requestAnimationFrame(moveIt);
        scrollPosition = $window.scrollTop();
        console.log('scrollPosition: ' + scrollPosition);
      });
    }

    setup();
  })();
});
