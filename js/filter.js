'use strict';

(function () {
  var filterDefault = document.querySelector('#filter-default');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterRandom = document.querySelector('#filter-random');
  var pictures = window.backend.loadPictures;
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  var checkFilter = function () {
    filterDefault.addEventListener('click', onDefault);
    filterDiscussed.addEventListener('click', onDiscussed);
    filterRandom.addEventListener('click', onRandom);
  };
  var onDefault = window.debounce.debounceData(function () {
    filterDefault.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    document.querySelectorAll('.picture').forEach(function (picture) {
      window.gallery.blockPictures.removeChild(picture);
    });
    window.gallery.renderPictures(pictures);
  });
  var onDiscussed = window.debounce.debounceData(function () {
    filterDiscussed.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    document.querySelectorAll('.picture').forEach(function (picture) {
      window.gallery.blockPictures.removeChild(picture);
    });
    var discussedPictures = pictures.slice();
    window.gallery.renderPictures(discussedPictures.sort(function (one, two) {
      return two.comments.length - one.comments.length;
    }));
  });
  var onRandom = window.debounce.debounceData(function () {
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    document.querySelectorAll('.picture').forEach(function (picture) {
      window.gallery.blockPictures.removeChild(picture);
    });
    var randomPictures = [];
    var randomValue = -1;
    while (randomPictures.length < 10) {
      randomValue = Math.floor(Math.random() * pictures.length);
      if (!randomPictures.includes(pictures[randomValue])) {
        randomPictures.push(pictures[randomValue]);
      }
    }
    window.gallery.renderPictures(randomPictures);
  });
  checkFilter();
})();
