'use strict';

var COUNT_PICTURES = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Лена', 'Игорь', 'Саша', 'Сергей', 'Кекс'];

var getCommentaries = function () {
  var randomComments = Math.floor(Math.random() * 100) + 25;
  var commentaries = [];
  for (var i = 0; i < randomComments; i++) {
    var comment = getCommentObject();
    var index = Math.floor(Math.random() * names.length);
    comment.name = names[index];
    comment.avatar = getTemplateQuality(comment.avatar, index);
    comment.message = getCommentPicture(getRandomIndexes(comments.length));
    commentaries[i] = comment;
  }
  return commentaries;
};
var getCommentObject = function () {
  var comment = {
    'avatar': 'img/avatar-{{i}}.svg',
    'message': 'messages',
    'name': 'name'
  };
  return comment;
};
var getCommentPicture = function (indexes) {
  var comment = '';
  if (indexes.length > 1) {
    comment = comments[indexes[0]] + ' ' + comments[indexes[1]];
  } else {
    comment = comments[indexes[0]];
  }
  return comment;
};
var getPictures = function (countPictures) {
  var pictures = [];
  for (var i = 0; i < countPictures; i++) {
    var picture = getPictureObject();
    picture.url = getTemplateQuality(picture.url, i);
    pictures[i] = picture;
  }
  return pictures;
};
var getTemplateQuality = function (quality, index) {
  index++;
  quality = quality.replace('{{i}}', index);
  return quality;
};
var getPictureObject = function () {
  var pictureObject = {
    'url': 'photos/{{i}}.jpg',
    'description': 'description picture',
    'likes': getRandomLikes(),
    'comments': getCommentaries()
  };
  return pictureObject;
};
var getRandomIndexes = function (length) {
  var indexes = [];
  if (Math.floor(Math.random() * 2)) {
    indexes[0] = Math.floor(Math.random() * length);
  } else {
    indexes[0] = Math.floor(Math.random() * length);
    indexes[1] = Math.floor(Math.random() * length);
    while (indexes[1] === indexes[0]) {
      indexes[1] = Math.floor(Math.random() * length);
    }
  }
  return indexes;
};
var getRandomLikes = function () {
  return Math.floor(Math.random() * 185) + 15;
};
var getBlockPicture = function () {
  return document.querySelector('.pictures');
};
var getTemplatePicture = function () {
  return document.querySelector('#picture').content.querySelector('.picture');
};
var getPicture = function (picture) {
  var pictureElement = getTemplatePicture().cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
  return pictureElement;
};
var renderPictures = function () {
  var blockPictures = getBlockPicture();
  var pictures = getPictures(COUNT_PICTURES);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(getPicture(pictures[i]));
  }
  blockPictures.appendChild(fragment);
};
renderPictures();
