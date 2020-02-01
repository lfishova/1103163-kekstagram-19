'use strict';

// var COUNT_PICTURES = 25;
var MIN_LIKES_VALUE = 15;
var MAX_LIKES_VALUE = 200;
// var MIN_COMMENT_VALUE = 25;
// var MAX_COMMENT_VALUE = 125;
// var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// var names = ['Артем', 'Лена', 'Игорь', 'Саша', 'Сергей', 'Кекс'];

var getCommentaries = function () {
  // var randomComments = getRandomInt(MIN_COMMENT_VALUE, MAX_COMMENT_VALUE);
  var commentaries = [];
  for (var i = 0; i < 3; i++) {
    // var index = getRandomInt(0, names.length);
    var comment = getCommentTemplate(i);
    // comment.name = names[index];
    // comment.message = getCommentPicture(getRandomIndexes(comments.length));
    commentaries[i] = comment;
  }
  return commentaries;
};
// var getCommentTemplate = function () {
//   var comment = {
//     'avatar': 'img/avatar-{{i}}.svg',
//     'message': 'messages',
//     'name': 'name'
//   };
//   return comment;
// };
var getCommentTemplate = function (index) {
  index++;
  var comment = {
    'avatar': 'img/avatar-' + index + '.svg',
    'message': 'messages',
    'name': 'name'
  };
  return comment;
};
// var getCommentPicture = function (indexes) {
//   var comment = indexes.length > 1 ? comments[indexes[0]] + ' ' + comments[indexes[1]] : comments[indexes[0]];
//   return comment;
// };
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
    'likes': getRandomInt(MIN_LIKES_VALUE, MAX_LIKES_VALUE),
    'comments': getCommentaries()
  };
  return picture;
};
// var getRandomIndexes = function (length) {
//   var indexes = [];
//   if (getRandomInt(0, 2)) {
//     indexes[0] = Math.floor(Math.random() * length);
//   } else {
//     indexes[0] = Math.floor(Math.random() * length);
//     indexes[1] = Math.floor(Math.random() * length);
//     while (indexes[1] === indexes[0]) {
//       indexes[1] = Math.floor(Math.random() * length);
//     }
//   }
//   return indexes;
// };
// var getBlockPicture = function () {
//   return document.querySelector('.pictures');
// };
// var getTemplatePicture = function () {
//   return document.querySelector('#picture').content.querySelector('.picture');
// };
// var getPicture = function (picture) {
//   var pictureElement = getTemplatePicture().cloneNode(true);
//   pictureElement.querySelector('.picture__img').src = picture.url;
//   pictureElement.querySelector('.picture__likes').textContent = picture.likes;
//   pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
//   return pictureElement;
// };
// var renderPictures = function () {
//   var blockPictures = getBlockPicture();
//   var pictures = getPictures(COUNT_PICTURES);
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < pictures.length; i++) {
//     fragment.appendChild(getPicture(pictures[i]));
//   }
//   blockPictures.appendChild(fragment);
// };
var getRandomInt = function (minInt, maxInt) {
  var value = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
  return value;
};
// renderPictures();
// for (var i = 0; i < 3; i++) {
//   console.log(getCommentTemplate1(i));
// }
console.log(getPictures(5));

