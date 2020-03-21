'use strict';

(function () {
  var blockPictures = document.querySelector('.pictures');
  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.data.getPicture(pictures[i]));
    }
    blockPictures.appendChild(fragment);
  };
  window.gallery = {
    blockPictures: blockPictures,
    renderPictures: renderPictures
  };
})();
