'use strict';

var COUNT_PICTURES = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Лена', 'Игорь', 'Саша', 'Сергей', 'Кекс', 'Коля'];

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
    picture.comments.avatar = getTemplateQuality(picture.comments.avatar, Math.floor(Math.random() * names.length));
    picture.comments.massage = getCommentPicture(getRandomIndexes(comments.length));
    pictures[i] = picture;
  }
  return pictures;
};
var getTemplateQuality = function (quality, index) {
  quality = quality.replace('{{i}}', index);
  return quality;
};
var getPictureObject = function () {
  var pictureObject = {
    'url': 'photos/{{i}}.jpg',
    'description': 'description picture',
    'likes': getRandomLikes(),
    'comments': {'avatar': 'img/avatar-{{i}}.svg', 'massage': 'messages', 'name': getRandomName(names)}
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
var getRandomName = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// for (var i = 0; i < getPictures(COUNT_PICTURES).length; i++) {
//   console.log(getPictures(COUNT_PICTURES)[i]);
// }
getPictures(COUNT_PICTURES);
