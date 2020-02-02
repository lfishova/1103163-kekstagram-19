'use strict';

const COUNT_PICTURES = 25;
const LIKES = {
  MIN: 15,
  MAX: 200
};
const COMMENT = {
  MIN: 25,
  MAX: 125
};
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Лена', 'Игорь', 'Саша', 'Сергей', 'Кекс'];
var blockPictures = document.querySelector('.pictures');

var getCommentaries = function () {
  var randomComments = getRandomInt(COMMENT.MIN, COMMENT.MAX);
  var commentaries = [];
  for (var i = 0; i < randomComments; i++) {
    var index = getRandomInt(0, names.length);
    var comment = getCommentTemplate(index);
    comment.name = names[index];
    comment.message = getCommentPicture(getRandomIndexes(comments.length));
    commentaries[i] = comment;
  }
  return commentaries;
};
var getCommentTemplate = function (index) {
  index++;
  var comment = {
    'avatar': 'img/avatar-' + index + '.svg',
    'message': 'messages',
    'name': 'name'
  };
  return comment;
};
var getCommentPicture = function (indexes) {
  var comment = indexes.length > 1 ? comments[indexes[0]] + ' ' + comments[indexes[1]] : comments[indexes[0]];
  return comment;
};
var getPictures = function (countPictures) {
  var pictures = [];
  for (var i = 0; i < countPictures; i++) {
    var index = i + 1;
    var picture = getPictureTemplate(index);
    pictures[i] = picture;
  }
  return pictures;
};
var getPictureTemplate = function (index) {
  var picture = {
    'url': 'photos/' + index + '.jpg',
    'description': 'description picture',
    'likes': getRandomInt(LIKES.MIN, LIKES.MAX),
    'comments': getCommentaries()
  };
  return picture;
};
var getRandomIndexes = function (length) {
  var indexes = [0, 0];
  indexes[0] = getRandomInt(0, length);
  if (getRandomInt(0, 2)) {
    indexes[1] = getRandomInt(0, length);
    while (indexes[1] === indexes[0]) {
      indexes[1] = getRandomInt(0, length);
    }
  }
  return indexes;
};
var getRandomInt = function (minInt, maxInt) {
  var value = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
  return value;
};
var getPicture = function (picture) {
  var pictureElement = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
  return pictureElement;
};
var renderPictures = function (countPictures) {
  var pictures = getPictures(countPictures);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(getPicture(pictures[i]));
  }
  blockPictures.appendChild(fragment);
};

renderPictures(COUNT_PICTURES);

