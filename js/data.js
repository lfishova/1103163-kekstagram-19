'use strict';

(function () {
  var getPicture = function (picture) {
    var pictureElement = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
    return pictureElement;
  };
  window.data = {
    getPicture: getPicture
  };
})();
