/* global $ */
(function () {
  'use strict';

  let scrollPosition = 0;
  let windowHeight = 0;
  let windowWidth = 0;

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
  // const c02LabVerbTitle = document.getElementById('P02-text-01');

  // console.log('c01Height: ' + c01Height);

  const stop = {
    'big-title': 750,
    'title-extra-1': 720
  };

  function onScroll() {
    requestAnimationFrame(parallax);
    scrollPosition = $(window).scrollTop();
  }

  function parallax() {
    console.log('scrollPosition: ' + scrollPosition);

    parallaxTitle();
    parallaxTitleExtras();
    // handleContainer02();

    // ######## //

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

    // #### Emhanced short version (verbose) #### //
    // $(children).each(function(i) {
    //   let id = children.eq(i).attr('id')
    //   let speed = 1;
    //
    //   if (id == 'P01-title-01' || id == 'P01-title-04') {
    //     speed = 10;
    //
    //   } else if (id == 'P01-title-02' || id == 'P01-title-05') {
    //     speed = 9;
    //
    //   } else if (id == 'P01-title-03' || id == 'P01-title-06') {
    //     speed = 8;
    //   }
    //
    //   children.eq(i).css({
    //     'transform': 'translate(0px, ' + (yScroll / speed) + '%)'
    //   })
    // });
  }

  function parallaxTitle() {
    if (scrollPosition < stop['big-title']) {
      $(c01BigTitleChildren).each(i => {
        const speed = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
        // const speed = (i == 1 || i == 4) ? 190 : (i == 2 || i == 5) ? 180 : 200;

        // console.log(children.eq(i));
        c01BigTitleChildren.eq(i).css({
          transform: 'translate(0px, ' + Math.round((-scrollPosition / speed)) + 'px)'
        });
      });
    }
  }

  function parallaxTitleExtras() {
    if (scrollPosition < stop['title-extra-1']) {
      $('.lab-verb-title-01').css({
        transform: 'translateY(' + (scrollPosition / 5) + 'px)'
      });
    }

    if (scrollPosition > stop['title-extra-1']) {
      $('.lab-verb-title-02').css({
        position: 'fixed'
      });
    } else {
      $('.lab-verb-title-02').css({
        position: 'absolute'
      });
    }
  }

  function handleContainer02() {
    // console.log('lab-verbose-title offset top: ' + $('.lab-verb-title-01').offset().top);

    const stop = 665;
    // console.log($('.lab-verb-title-01').offset().left);
    const wH = $(window).height();
    const wW = $(window).width();
    // console.log(wH);
    // const topOffset = $('.lab-verb-title-01').offset().top;
    console.log('topOffset: ' + topOffset01);

    const pageY = Math.round((topOffset01 / 3.5) + (scrollPosition - ($(window).height() / 2)));
    const pageY2 = Math.round((topOffset02 / 3.5) + (scrollPosition - ($(window).height() / 2)));
    const pageYY = Math.round(-scrollPosition / 2);

    const distance = Math.round(topOffset01 + 50);

    // curve //
    // const pos = ((4 * wW) / (Math.pow(wH, 3))) * Math.pow((scrollPosition / 2) - (wH / 2), 3);

    // if (scrollPosition > ($('.lab-verb-title').offset().top - $(window).height())) {
    /*  $('.lab-verb-title-01').css({
       transform: 'translate(' + Math.round((-scrollPosition / 20)) + '%,' + Math.round((scrollPosition / 3.5)) + '%)'
     });
     $('.lab-verb-title-02').css({
       transform: 'translate(' + Math.round((scrollPosition / 20)) + '%,' + Math.round((scrollPosition / 3.5)) + '%)'
     }); */
    $('.lab-verb-title-01').css({
      transform: 'translate3d(' + Math.round((-scrollPosition * 1.5)) + 'px,' + pageY + 'px, 0px)'
    });
    // $('.lab-verb-title-02').css({
    //   transform: 'translate(' + Math.round((scrollPosition * 1.5)) + 'px,' + pageY2 + 'px)'
    // });
    // }
    /* else {
         $('.lab-verb-title-01').css({
           transform: 'translate(-659px,' + Math.round((-scrollPosition / 3)) + 'px)'
         });
         $('.lab-verb-title-02').css({
           transform: 'translate(659px,' + Math.round((-scrollPosition / 3)) + 'px)'
         });
       } */
  }

  function setTranslate3d(x, y, z, el) {
    el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px,' + z + 'px)';
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
      console.log('Switch to landscape for better user experience');
      // $('#block_land').show();
      // $('.notPortrait').hide();
    }
  }

  window.addEventListener('orientationchange', testOrientation, false);
  window.addEventListener('scroll', onScroll, false);
})();
