'use strict';

(function () {
  var domPictures = document.querySelectorAll('.picture');
  var onRandomPictureClick = function (evt, data) {
    if (evt.target && evt.target.matches('img.picture__img')) {
      var indexRandomPicture = getIndexRandomPicture(evt.target.attributes['src'].value);
      window.picture.renderOnePicture(data[indexRandomPicture]);
      showBigPicture();
    }
  };
  var onRandomPictureEnterPress = function (evt, data) {
    if (evt.target && evt.target.matches('a.picture')) {
      window.picture.renderOnePicture(data[getIndexRandomPicture(evt.target.firstElementChild.attributes['src'].value)]);
      showBigPicture();
    }
  };
  var getIndexRandomPicture = function (str) {
    return parseInt(str.match(/[0-9]+/), 10) - 1;
  };
  var openRandomPicture = function (data) {
    document.addEventListener('click', function (evt) {
      onRandomPictureClick(evt, data);
    });
    document.addEventListener('keydown', function (evt) {
      var evtCheck = evt;
      if (evtCheck.key === 'Enter') {
        onRandomPictureEnterPress(evtCheck, data);
      }
    });
  };
  var addTabIndexPictures = function (pictures) {
    for (var i = 0; i < pictures.length; i++) {
      pictures[i].tabIndex = 0;
    }
  };
  var showBigPicture = function () {
    window.picture.bigPicture.classList.remove('hidden');
  };
  addTabIndexPictures(domPictures);
  window.preview = {
    openRandomPicture: openRandomPicture
  };
  // showBigPicture();
})();
