/* global $ */
(function () {
  'use strict';

  let scrollPosition = 0;

  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  // console.log(requestAnimationFrame.toString());

  const c01TitleChildren = $('#P01-title-all').children();
  const c01Height = $('.container-01').height();
  const topOffset01 = $('.lab-verb-title-01').offset().top;
  const topOffset02 = $('.lab-verb-title-02').offset().top;
  //const c02LabVerbTitle = document.getElementById('P02-text-01');

  //console.log('c01Height: ' + c01Height);

  function onScroll() {
    requestAnimationFrame(parallax);
    // parallax();
    //scrollPosition = window.pageYOffset;
    scrollPosition = $(window).scrollTop();
  }

  function parallax() {
    console.log('scrollPosition: ' + scrollPosition);

    handleContainer01();
    handleContainer02();

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

  function handleContainer01() {
    // console.log('P01-title-all offset top: ' + $('#P01-title-all').offset().top);

    // if (scrollPosition < c01Height) {
    $(c01TitleChildren).each(i => {
      const speed = (i === 1 || i === 4) ? 6 : (i === 2 || i === 5) ? 8 : 5;
      // const speed = (i == 1 || i == 4) ? 190 : (i == 2 || i == 5) ? 180 : 200;

      // console.log(children.eq(i));
      c01TitleChildren.eq(i).css({
        transform: 'translate(0px, ' + Math.round((-scrollPosition / speed)) + 'px)'
      });
    });
    // }
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

  // addEventListener('mousewheel', Object);
  window.addEventListener('orientationchange', testOrientation, false);
  window.addEventListener('scroll', onScroll, false);

  // $('main').stellar({
  //   // Set scrolling to be in either one or both directions
  //   horizontalScrolling: true,
  //   verticalScrolling: true,
  
  //   // Set the global alignment offsets
  //   horizontalOffset: 0,
  //   verticalOffset: 0,
  
  //   // Refreshes parallax content on window load and resize
  //   responsive: false,
  
  //   // Select which property is used to calculate scroll.
  //   // Choose 'scroll', 'position', 'margin' or 'transform',
  //   // or write your own 'scrollProperty' plugin.
  //   scrollProperty: 'scroll',
  
  //   // Select which property is used to position elements.
  //   // Choose between 'position' or 'transform',
  //   // or write your own 'positionProperty' plugin.
  //   positionProperty: 'position',
  
  //   // Enable or disable the two types of parallax
  //   parallaxBackgrounds: true,
  //   parallaxElements: true,
  
  //   // Hide parallax elements that move outside the viewport
  //   hideDistantElements: true,
  
  //   // Customise how elements are shown and hidden
  //   hideElement: function($elem) { $elem.hide(); },
  //   showElement: function($elem) { $elem.show(); }
  // });
})();
