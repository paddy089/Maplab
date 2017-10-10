/* global $, skrollr */
(function () {
  'use strict';

  let scrollPosition = 0;
  let c01LastScrollPos = 0;
  // let windowHeight = 0;
  // let windowWidth = 0;

  const $window = $(window);
  // const $body = $('body');
  const requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame;
// ### page elements ### //
  // const c01BigTitleChildren = $('.title-maplab').children();
  let c01TitleMovement = false;
  const c01BigTitleElements = {};

// animation anchors
  const anchor = {
    a01: 750,
    a02: 720,
    a03: 3200
  };

// ### functions ### //
  function onScroll() {
    requestAnimationFrame(parallax);
    scrollPosition = $window.scrollTop();
  }

  function parallax() {
    console.log('scrollPosition: ' + scrollPosition);

    moveTitle();
    moveTitleExtras();
  }

  function setupTitleElements() {
    const obj = c01BigTitleElements;
    const children = $('.title-maplab').children();
    children.each(i => {
      const factor = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
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
      // c01BigTitleChildren.each(i => {
      //   const speed = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
      //   const $el = c01BigTitleChildren.eq(i);
      //   const y = scrollPosition / speed * -1;

      //   setTranslate3d(0, y, 0, $el);
      // });

      Object.keys(c01BigTitleElements).forEach(key => {
        const y = scrollPosition / c01BigTitleElements[key].speed * -1;
        setTranslate3d(0, y, 0, c01BigTitleElements[key].el);
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

    // console.log('vB : ' + vBottom);
    // console.log('vT : ' + vTop);
    // console.log('c03B : ' + c03Bottom);
    // console.log('<c03T : ' + c03Top);
    // vBottom < c03Top || vTop > c03Bottom

    // console.log('top: ' + top);
    // const bottom = top - $window.height();
    // console.log('bottom: ' + bottom);

    // const $this = $('.lab-verb-title-02');
    // const offset = $this.offset().top;
    // const height = $this.outerHeight();
    // const left = $this.position().left;
    // const factor = 0.5;
    // const t = Math.round(((offset - (windowHeight / 2) + height) - scrollPosition) * factor);
    // // const t = left + tt;
    // const top = 'top' + offset + 'px';

    // console.log(offset);

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
    // if (scrollPosition > 1400) {
    //   setTranslate3d(x4, 0, 0, $el4);
    // }
    // if (scrollPosition > $(document).height() - $c03.outerHeight()) {
    //   setTranslate3d(x4, 0, 0, $c04);
    // }
    // if (!(vBottom < c03Top || vTop > c03Bottom)) {
    //   setTranslate3d((x4 / 4), 0, 0, $c04);
    // }
  }

  function setTranslate3d(x, y, z, $el) {
    $el.css({
      transform: 'translate3d(' + x + 'px, ' + y + 'px,' + z + 'px)'
    });
  }

  function getTranslateValues(_$el) {
    const $el = _$el;
    const transformMatrix = $el.css('-webkit-transform') ||
                            $el.css('-moz-transform') ||
                            $el.css('-ms-transform') ||
                            $el.css('-o-transform') ||
                            $el.css('transform');

    const matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
    // console.log(matrix);
    const dx = parseInt(matrix[12] || matrix[4], 10);
    const dy = parseInt(matrix[13] || matrix[5], 10);
    // const dx = matrix[12] || matrix[4];
    // const dy = matrix[13] || matrix[5];
    // Math.round ??
    return {x: dx, y: dy};
  }

  /*   $('html').on('mousewheel', event => {
    console.log(event.deltaX, event.deltaY, event.deltaFactor);
    requestAnimationFrame(parallax);
    scrollPosition = window.pageYOffset;
  }); */

  /*  $(window).on('resize', () => {
     // height = parallaxImage.height();
     // Code to update element values...
   }); */

  /*   $(window).on('scroll', () => {
      // 6. Inside the event handler we loop each cached image object from the array
      // $.each(parallaxImages, function(index, parallaxImage) {
          // Logic to see which image should currently be shown...
          // Code to update `transform: translate3d` value...
    }); */

  /* $(window).on('scroll', () => {
    requestAnimationFrame(parallax);
    scrollPosition = window.pageYOffset;
  }); */

  function testOrientation() {
    if (screen.width > screen.height) {
      // $('#block_land').hide();
      // $('.notPortrait').show()
    } else {
      console.log('Switch to landscape view for better user experience');
      // $('#block_land').show();
      // $('.notPortrait').hide();
    }
  }
  setupTitleElements();
  // window.addEventListener('onload', setup, false);
  window.addEventListener('orientationchange', testOrientation, false);
  window.addEventListener('scroll', onScroll, false);
  // skrollr.init();
  // $(window).paroller();
})();
