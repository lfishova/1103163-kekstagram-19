'use strict';

(function () {
  var domPictures = document.querySelectorAll('.picture');
  var onRandomPictureClick = function (evt) {
    if (evt.target && evt.target.matches('img.picture__img')) {
      var indexRandomPicture = getIndexRandomPicture(evt.target.attributes['src'].value);
      window.picture.renderOnePicture(window.data.getPictureTemplate(indexRandomPicture));
      showBigPicture();
    }
  };
  var onRandomPictureEnterPress = function (evt) {
    if (evt.target && evt.target.matches('a.picture')) {
      window.picture.renderOnePicture(window.data.getPictureTemplate(getIndexRandomPicture(evt.target.firstElementChild.attributes['src'].value)));
      showBigPicture();
    }
  };
  var getIndexRandomPicture = function (str) {
    return parseInt(str.match(/[0-9]+/), 10);
  };
  var openRandomPicture = function () {
    document.addEventListener('click', function (evt) {
      onRandomPictureClick(evt);
    });
    document.addEventListener('keydown', function (evt) {
      var evtCheck = evt;
      if (evtCheck.key === 'Enter') {
        onRandomPictureEnterPress(evtCheck);
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
  openRandomPicture();
  showBigPicture();
})();
