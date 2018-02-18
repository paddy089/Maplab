/* global $, skrollr */
$(() => {
  (function () {
    'use strict';
    
    // enable/disable console logging
    const LOGGING = false;

    // global window object
    const $window = $(window);

    // words animation variables
    const words = document.getElementsByClassName('word');
    let wordArray = [];
    let currentWord = 0;

    // #### words animation functions #### //
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
      if (LOGGING) console.log('changeWord');

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
      words[currentWord].style.opacity = 1;
      for (let i = 0; i < words.length; i++) {
        wordArray.push(splitLetters(words[i]));
      }
  
      changeWord();
      setInterval(changeWord, 3000);
    }
    // #### END words animation functions #### //

    // #### scroll me words animation functions #### //
    function startScrollMeAnimation() {
      const words = document.getElementsByClassName('word-scrollme');
      let wordArray = [];
      let currentWord = 0;

      words[currentWord].style.opacity = 1;
      for (let i = 0; i < words.length; i++) {
        wordArray.push(splitLetters(words[i]));
      }

      if (LOGGING) {
        console.log(words);
        console.log(words[currentWord]);
        console.log(wordArray);
      }

      changeWord(wordArray, words);
      setInterval(changeWord(wordArray, words), 4000);
    }
    // #### END scroll me words animation functions #### //

    // #### typewriter functions #### //
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
    // #### END typewriter functions #### //

    // #### custom css transform functions #### //
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
    // #### END custom css transform functions #### //

    // check device orientation
    function testOrientation() {
      const width = $window.width() || screen.width;
      const height = $window.height() ||  screen.height;
      const ratio = width / height;
      const landscape = ratio >= 1.25 && ratio <= 2.3;
      if (landscape) {
        $('.portrait').hide();
        $('.parallax').show();
      } else {
        $('.parallax').hide();
        $('.portrait').show();
      }
    }

    // initalize stuff
    function setup() {
      //testOrientation();

      skrollr.init({
        smoothScrolling: true,
        scale: 0.01,
        forceHeight: true,
        mobileDeceleration: 0.004
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

      // $window.on('resize orientationchange', () => {
      //   testOrientation();
      // });
    }

    setup();
  })();
});
