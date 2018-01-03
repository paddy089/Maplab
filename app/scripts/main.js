/* global $, skrollr */
$(() => {
  (function () {
    'use strict';

    // let scrollPosition = 0;
    // let c01LastScrollPos = 0;

    const $window = $(window);
    const words = document.getElementsByClassName('word');
    console.log(words);
    let wordArray = [];
    let currentWord = 0;
    // const requestAnimationFrame = window.requestAnimationFrame ||
    //   window.mozRequestAnimationFrame ||
    //   window.webkitRequestAnimationFrame ||
    //   window.oRequestAnimationFrame ||
    //   window.msRequestAnimationFrame;

    // ### page elements ### //
    // let c01TitleMovement = false;
    // const c01BigTitleElements = {};

    // animation anchors
    // const anchor = {
    //   a01: 750,
    //   a02: 720,
    //   a03: 3200
    // };

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
        const $el = children.eq(i);
        const key = 'el' + i;
        obj[key] = {
          el: $el,
          speed: factor,
          lastPosition: 0
        };
      });
    }

    function moveTitle() {
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

    // #### words animation #### //
    function splitLetters(word) {
      const content = word.innerHTML;
      word.innerHTML = '';
      let letters = [];
      for (let i = 0; i < content.length; i++) {
        const letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }
      return letters
    }

    function changeWord() {
      console.log('changeWord');
      const cw = wordArray[currentWord];
      const nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
      for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
      setTimeout(function () {
        cw[i].className = 'letter out';
      }, i * 80);
    }

    function animateLetterIn(nw, i) {
      setTimeout(function () {
        nw[i].className = 'letter in';
      }, 340 + (i * 80));
    }

    function startMapsWordsAnimation() {
      // let currentWord = 0;

      words[currentWord].style.opacity = 1;
      for (let i = 0; i < words.length; i++) {
        wordArray.push(splitLetters(words[i]));
      }
      console.log(wordArray);
  
      changeWord();
      setInterval(changeWord, 4000);
    }

    function startScrollMeAnimation() {
      const words = document.getElementsByClassName('word-scrollme');
      console.log(words);
      let wordArray = [];
      let currentWord = 0;
      console.log(words[currentWord]);

      words[currentWord].style.opacity = 1;
      for (let i = 0; i < words.length; i++) {
        wordArray.push(splitLetters(words[i]));
      }
      console.log(wordArray);

      changeWord(wordArray, words);
      setInterval(changeWord(wordArray, words), 4000);
    }

    // #### ####
    // #### typewriter
    function typeWriter(text, n) {
      const l = text.length;
      if (n === l) {
        n = 0;
        setTimeout(function () {
          typeWriter(text, n)
        }, 3500);
      } else {  
        if (n < l) {
        const sub = text.substring(0, n + 1);
        $('.tp').html(sub);
        n++;
        setTimeout(function () {
          typeWriter(text, n)
        }, 200);
      }}
    
    }
    // #### ####

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
        const height = $window.height() ||  screen.height;
        // testOrientation(width, height);
      });

      // $window.on('scroll', () => {
        // requestAnimationFrame(moveIt);
        // scrollPosition = $window.scrollTop();
        // console.log('scrollPosition: ' + scrollPosition);
      // });

      // startScrollMeAnimation();
      startMapsWordsAnimation();

      // #### start typewriter #### //
      // const tp_text = $('.tp').data('text');
      // console.log(tp_text);
      // typeWriter(tp_text, 0);
      // const tp_text = $('.typeitinner').data('text');
      // console.log(tp_text);
      // typeWriter(tp_text, 0);
    }

    setup();
  })();
});
