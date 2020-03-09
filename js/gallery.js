'use strict';

(function () {
  var blockPictures = document.querySelector('.pictures');
  var renderPictures = function (countPictures) {
    var pictures = window.data.getPictures(countPictures);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.data.getPicture(pictures[i]));
    }
    blockPictures.appendChild(fragment);
  };
  renderPictures(window.data.COUNT_PICTURES);
})();
