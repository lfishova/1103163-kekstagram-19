'use strict';

var COUNT_DESCRIPTION = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getCommentDescription = function (indexes, object) {
  var comment = '';
  if (indexes.length > 1) {
    comment = comments[indexes[0]] + ' ' + comments[indexes[1]];
  } else {
    comment = comments[indexes[0]];
  }
  object.comments = comment;
  return object;
};
var getDescriptions = function (countDescription) {
  var descriptions = [];
  for (var i = 0; i < countDescription; i++) {
    var description = getDescriptionPicture(getCommentDescription(getRandomIndexes(comments.length), getDescriptionPictureObject()), i);
    descriptions[i] = description;
  }
  return descriptions;
};
var getDescriptionPicture = function (object, index) {
  var str = object.url;
  object.url = str.replace('{{i}}', index);
  return object;
};
var getDescriptionPictureObject = function () {
  var description = {
    'url': 'photos/{{i}}.jpg',
    'description': 'description',
    'likes': getRandomLikes(),
    'comments': 'comment'
  };
  return description;
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

// for (var i = 0; i < getDescriptions(COUNT_DESCRIPTION).length; i++) {
//   console.log(getDescriptions(COUNT_DESCRIPTION)[i]);
// }
getDescriptions(COUNT_DESCRIPTION);
