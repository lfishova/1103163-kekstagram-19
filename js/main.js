'use strict'

var COUNT_DESCRIPTION = 25;
// var comments = [
//   {'comment'}
// ]
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
  }
  return description;
};
var getRandomLikes = function () {
  return Math.floor(Math.random() * 185) + 15;
};
var comments = [];
for (var i = 0; i < 5; i++) {
  var comment = getDescriptionPicture(getDescriptionPictureObject(), i);
  comments[i] = comment;
}
for (var i = 0; i < comments.length; i++) {
  console.log(comments[i]);
}
