'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var imgBigPicture = bigPicture.querySelector('.big-picture__img');
  var blockComments = bigPicture.querySelector('.social__comments');
  var renderOnePicture = function (picture) {
    imgBigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length.toString();
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    renderCommentsOnePicture(picture.comments);
  };
  var renderCommentsOnePicture = function (arr) {
    removeAllComments();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(getCommentElement(arr[i]));
    }
    blockComments.appendChild(fragment);
  };
  var getCommentElement = function (comment) {
    var fragment = document.createElement('li');
    fragment.className = 'social__comment';
    fragment.appendChild(fillAttributeImage(comment));
    fragment.appendChild(fillAttributeParagraph(comment));
    return fragment;
  };
  var fillAttributeImage = function (comment) {
    var imageElement = document.createElement('img');
    imageElement.className = 'social__picture';
    imageElement.src = comment.avatar;
    imageElement.alt = comment.name;
    imageElement.width = '35';
    imageElement.height = '35';
    return imageElement;
  };
  var fillAttributeParagraph = function (comment) {
    var paragraphElement = document.createElement('p');
    paragraphElement.className = 'social__text';
    paragraphElement.textContent = comment.message;
    return paragraphElement;
  };
  var addClass = function () {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  };
  var removeAllComments = function () {
    while (blockComments.firstChild) {
      blockComments.removeChild(blockComments.firstChild);
    }
  };
  addClass();
  window.picture = {
    bigPicture: bigPicture,
    renderOnePicture: renderOnePicture
  };
})();
