'use strict';

(function () {
  var EFFECT_LIMIT = {
    MIN: 1,
    MAX: 3,
    PERCENT: 100
  };
  var SCALE = {
    MAX_SCALE: 100,
    MIN_SCALE: 25
  };
  var HASHTAG = {
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };
  var MESSAGE = {
    NONE: -1,
    BEGIN_HASHTAG: 0,
    TOO_MORE_COUNT: 1,
    MAX_TAG_LETTER_COUNT: 2,
    ONLY_HASGTAG: 3,
    DOUBLE_HASHTAG: 4
  };
  var ONLY_LETTERS_AND_NUMBERS = /^#[a-zA-Z0-9]+$/;
  var STEP = 25;
  var hashtagMessages = ['Хештег начинается с символа #', 'Количество тегов не должно превышать 5', 'максимальная длина одного хэш-тега 20 символов, включая решётку', 'хеш-тег не может состоять только из одной решётки', 'один и тот же хэш-тег не может быть использован дважды', 'строка после решётки должна состоять из букв и чисел'];
  var effect = document.querySelector('.effects');
  var effectLine = document.querySelector('.effect-level__line');
  var textHashtags = document.querySelector('.text__hashtags');
  var scale = document.querySelector('.scale');
  var form = document.querySelector('.img-upload__form');
  var checkEffect = function (effectFilter, value) {
    document.querySelector('.effect-level__value').value = Math.floor(value);
    if (effectFilter === 'effects__preview--chrome') {
      window.varData.imgPreview.style.filter = 'grayscale(' + value + '%)';
    } else if (effectFilter === 'effects__preview--marvin') {
      window.varData.imgPreview.style.filter = 'invert(' + value + '%)';
    } else if (effectFilter === 'effects__preview--phobos') {
      window.varData.imgPreview.style.filter = 'blur(' + (EFFECT_LIMIT.MIN + value * (EFFECT_LIMIT.MAX - EFFECT_LIMIT.MIN) / EFFECT_LIMIT.PERCENT) + 'px)';
    } else if (effectFilter === 'effects__preview--heat') {
      window.varData.imgPreview.style.filter = 'brightness(' + (EFFECT_LIMIT.MIN + value * (EFFECT_LIMIT.MAX - EFFECT_LIMIT.MIN) / EFFECT_LIMIT.PERCENT) + ')';
    } else if (effectFilter === 'effects__preview--sepia') {
      window.varData.imgPreview.style.filter = 'sepia(' + value + '%)';
    }
  };
  var onFilterChange = function (evt) {
    window.varData.imgPreview.classList.remove(window.varData.imgPreview.classList.value);
    window.varData.imgPreview.style.filter = 'none';
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      var filter = 'effects__preview--' + evt.target.value;
      window.varData.imgPreview.classList.add(filter);
      if (evt.target.value !== 'none') {
        document.querySelector('.effect-level').classList.remove('hidden');
        var value = 100;
        checkEffect(filter, value);
        window.varData.effectPin.style.left = window.constData.EFFECT_LINE.MAX_LENGTH + 'px';
        window.varData.effectDepth.style.width = effectLine.clientWidth + 'px';
        window.varData.effectDepth.style.fill = window.constData.EFFECT_LINE.COLOR;
      } else {
        document.querySelector('.effect-level').classList.add('hidden');
      }
    }
  };
  var checkFilter = function () {
    effect.addEventListener('change', function (evt) {
      onFilterChange(evt);
    });
  };
  var startFilter = function () {
    window.varData.imgPreview.classList.add('.effects__preview--none');
    document.querySelector('.effect-level').classList.add('hidden');
  };
  var removeAllFilter = function () {
    window.varData.imgPreview.classList.remove(window.varData.imgPreview.classList.value);
  };
  var clearValue = function (element) {
    element.value = '';
  };
  var setScaleValue = function (setValue) {
    scale.querySelector('.scale__control--value').value = setValue + '%';
    document.querySelector('.img-upload__preview').querySelector('img').style.transform = 'scale(' + setValue * 0.01 + ')';
  };
  var getScaleValue = function () {
    return scale.querySelector('.scale__control--value').value;
  };
  var onScaleControlSmallerClick = function () {
    var smallNumber = parseInt(getScaleValue().replace('%', ''), 10);
    scale.querySelector('.scale__control--bigger').disabled = false;
    smallNumber -= STEP;
    if (smallNumber < SCALE.MIN_SCALE) {
      scale.querySelector('.scale__control--smaller').disabled = true;
    } else {
      setScaleValue(smallNumber);
    }
  };
  var onScaleControlBiggerClick = function () {
    var bigNumber = parseInt(getScaleValue().replace('%', ''), 10);
    scale.querySelector('.scale__control--smaller').disabled = false;
    bigNumber += STEP;
    if (bigNumber > SCALE.MAX_SCALE) {
      scale.querySelector('.scale__control--bigger').disabled = true;
    } else {
      setScaleValue(bigNumber);
    }
  };
  var stepScaleDown = function () {
    scale.querySelector('.scale__control--smaller').addEventListener('click', function () {
      onScaleControlSmallerClick();
    });
  };
  var stepScaleUp = function () {
    scale.querySelector('.scale__control--bigger').addEventListener('click', function () {
      onScaleControlBiggerClick();
    });
  };
  var checkForm = function () {
    document.querySelector('#upload-submit').addEventListener('click', function () {
      var hashtags = textHashtags.value.trim().split(/[' ']+/);
      hashtags = getLowerLetter(hashtags);
      textHashtags.value = hashtags.join(' ');
      var num = checkOneHaskTag(hashtags);
      if ((hashtags[0] !== '') && (num !== MESSAGE.NONE)) {
        textHashtags.setCustomValidity(hashtagMessages[num]);
      } else {
        textHashtags.setCustomValidity('');
      }
    });
  };
  var checkCountHashtags = function (arr) {
    return arr.length > HASHTAG.MAX_COUNT ? MESSAGE.TOO_MORE_COUNT : MESSAGE.NONE;
  };
  var checkOneHaskTag = function (arr) {
    var num = checkCountHashtags(arr);
    if (num === MESSAGE.NONE) {
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        if (str[0] !== '#') {
          num = MESSAGE.BEGIN_HASHTAG;
          break;
        } else if (str.length > HASHTAG.MAX_LENGTH) {
          num = MESSAGE.MAX_TAG_LETTER_COUNT;
          break;
        } else if (str === '#') {
          num = MESSAGE.ONLY_HASGTAG;
          break;
        } else if (!ONLY_LETTERS_AND_NUMBERS.test(str)) {
          num = 5;
          break;
        } else {
          num = uniqueElement(arr);
        }

      }
    }
    return num;
  };
  var uniqueElement = function (arr) {
    var uniques = [];
    for (var i = 0; i < arr.length; i++) {
      if (!uniques.includes(arr[i])) {
        uniques.push(arr[i]);
      }
    }
    return uniques.length === arr.length ? MESSAGE.NONE : MESSAGE.DOUBLE_HASHTAG;
  };
  var getLowerLetter = function (arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i].toLowerCase());
    }
    return result;
  };
  var sendData = function () {
    form.addEventListener('submit', function (evt) {
      window.backend.upload(new FormData(form), function () {
        document.querySelector('.img-upload__overlay').classList.add('hidden');
        clearValue(window.modal.uploadFile);
        window.form.removeAllFilter();
        window.form.startFilter();
        window.varData.imgPreview.style.filter = 'none';
        var successMessage = document.querySelector('main').appendChild(document.querySelector('#success').content.querySelector('.success').cloneNode(true));
        successMessage.querySelector('.success__button').addEventListener('click', function () {
          document.querySelector('main').removeChild(document.querySelector('.success'));
        });
        document.addEventListener('keydown', function (evtESC) {
          if (evtESC.key === window.modal.ESC_KEY) {
            document.querySelector('main').removeChild(document.querySelector('.success'));
          }
        });
        document.addEventListener('click', function (evtClick) {
          if (evtClick.target && evtClick.target.matches('.success')) {
            document.querySelector('main').removeChild(document.querySelector('.success'));
          }
        });
      }, function () {
        document.querySelector('.img-upload__overlay').classList.add('hidden');
        var successMessage = document.querySelector('main').appendChild(document.querySelector('#error').content.querySelector('.error').cloneNode(true));
        successMessage.querySelector('.error__button').addEventListener('click', function () {
          document.querySelector('main').removeChild(document.querySelector('.error'));
        });
        document.addEventListener('keydown', function (evtESC) {
          if (evtESC.key === window.modal.ESC_KEY) {
            document.querySelector('main').removeChild(document.querySelector('.error'));
          }
        });
        document.addEventListener('click', function (evtClick) {
          if (evtClick.target && evtClick.target.matches('.error')) {
            document.querySelector('main').removeChild(document.querySelector('.error'));
          }
        });
      });
      evt.preventDefault();
    });
  };

  sendData();
  checkFilter();
  startFilter();
  stepScaleUp();
  stepScaleDown();
  checkForm();
  window.form = {
    checkEffect: checkEffect,
    startFilter: startFilter,
    removeAllFilter: removeAllFilter,
    clearValue: clearValue,
    setScaleValue: setScaleValue
  };
})();
