/* global $, skrollr */
(function () {
  'use strict';

  let scrollPosition = 0;
  let windowHeight = 0;
  let windowWidth = 0;
  let lastScrollPos = 0;

  const $window = $('window');
  const $body = $('body');
  const requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

  const c01BigTitleChildren = $('.title-maplab').children();
  const topOffset01 = $('.lab-verb-title-01').offset().top;
  const topOffset02 = $('.lab-verb-title-02').offset().top;
  const testOffset = $('#P01-title-01').offset().top;
  const stop = {
    'big-title': 750,
    'title-extra-1': 720,
    'move-big-title-again': 3200
  };

  function parallax() {
    console.log('scrollPosition: ' + scrollPosition);

    moveTitle();
    moveTitleExtras();
    // handleContainer02();

    // ######## //

    // $("#el").offset().top - $(document).scrollTop()

    // yScroll = document.body.scrollTop || document.documentElement.scrollTop;
    // yScroll = $(window).scrollTop();
    // scrollPosition = window.scrollY;
    // const stop = $('#P01-title-01').offset().top - ($(window).height() / 5);
    // console.log(yScroll);
    // console.log(stop)
    /* const title01 = document.querySelectorAll('#P01-title-01'); */
    /* $('#P01-title-06').css({
      'transform': 'translate(' + (yScroll / 1.1) + '%, ' + yScroll + 'px)' // only move on x-axis
    }); */

    // ######## //
  }

  function moveTitle() {
    if (scrollPosition < stop['big-title']) {
      $(c01BigTitleChildren).each(i => {
        const speed = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
        const $el = c01BigTitleChildren.eq(i);
        const y = scrollPosition / speed * -1;

        setTranslate3d(0, y, 0, $el);
      });
    }
    // lastScrollPos = scrollPosition;
    // } else if (scrollPosition > 3200) {
    //   // const pos = scrollPosition - lastScrollPos - testOffset - 400;
    //   hh = true;
    //   const pos = scrollPosition - lastScrollPos - $(window).height() - testOffset - 150;
    //   console.log('lastScrollPos:' + lastScrollPos);
    //   console.log('calcPos: ' + pos);

    //   $(c01BigTitleChildren).each(i => {
    //     const speed = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
    //     // const speed = (i == 1 || i == 4) ? 190 : (i == 2 || i == 5) ? 180 : 200;

    //     // console.log(children.eq(i));
    //     c01BigTitleChildren.eq(i).css({
    //       transform: 'translate(0px, ' + Math.round(pos / speed * -1) + 'px)'
    //     });
    //   });
    // }
  }

  function moveTitleExtras() {
    const $el1 = $('.lab-verb-title-01');
    const $el2 = $('.lab-verb-title-02');
    const $el3 = $('.lab-verb-title-03');
    const el1_y = scrollPosition / 5;
    const el2_y = scrollPosition * -1.2;
    const el3_y = scrollPosition * -1.1;

    // const $this = $('.lab-verb-title-02');
    // const offset = $this.offset().top;
    // const height = $this.outerHeight();
    // const left = $this.position().left;
    // const factor = 0.5;
    // const t = Math.round(((offset - (windowHeight / 2) + height) - scrollPosition) * factor);
    // // const t = left + tt;
    // const top = 'top' + offset + 'px';

    // console.log(offset);

    if (scrollPosition < stop['title-extra-1']) {
      setTranslate3d(0, el1_y, 0, $el1);
    }

    if (scrollPosition < 1330) {
      setTranslate3d(0, el3_y, 0, $el3);
    }

    if (scrollPosition < 1100) {
      setTranslate3d(0, el2_y, 0, $el2);
      // $('.lab-verb-title-02').css({
      //   transform: 'translate(' + t + 'px)'
      // });
      // $('.lab-verb-title-02').css({
      //   position: 'fixed'
      // });
      // const fo = 4;
      // const fn = fo + (scrollPosition / scrollPosition);
      // const s = fn + 'wh';
      // $('.lab-verb-title-02').css({
      //   'font-size': s
      // });
    } else {
      // $('.lab-verb-title-02').css({
      //   position: 'absolute'
      // });
    }
    if (scrollPosition > 3200) {
      // $('.lab-verb-title-01').css({
      //   transform: 'translateY(' + -1 + 'px)'
      // });
    }
  }

  function setTranslate3d(x, y, z, el) {
    // el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px,' + z + 'px)';
    el.css({
      transform: 'translate3d(' + x + 'px, ' + y + 'px,' + z + 'px)'
    });
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

  function onScroll() {
    requestAnimationFrame(parallax);
    scrollPosition = $(window).scrollTop();
  }

  window.addEventListener('orientationchange', testOrientation, false);
  window.addEventListener('scroll', onScroll, false);
  // skrollr.init();
  // $(window).paroller();
})();
